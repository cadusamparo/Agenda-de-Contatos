import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const Section = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  height: 460px;
  border-radius: 12px;
`;

const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 55px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 35px;
  padding: 10px;
  font-size: 15px;
  background-color: #f9f9f9;
  border: 0;
  margin-bottom: 6px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #037e84;
  color: white;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    background-color: #016469;
  }
`;

const ButtonLogout = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: red;
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin-top: 2px;

  &:hover {
    background-color: #770202;
  }
`;

const TableContainer = styled.div`
  flex: 1;
`;

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #037e84;
  color: white;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  background-color: ${(props) => (props.isEven ? "#f2f2f2" : "transparent")};
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 0.5px solid #efefef;
  background-color: #fff;
`;

const ButtonIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.color || "#000"};
  font-size: 18px;
  transition: color 0.3s ease;

  &:hover {
    color: #f44336;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  font-size: 18px;
  margin: 0;
  color: #037e84;
  background-color: #037e84;
  color: white;
  width: 100%;
  height: 42px;
  padding: 12px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export default function Contatos() {
  const [contatos, setContatos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const nameRef = useRef();
  const phoneRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:8800/${id}`);
      const newArray = contatos.filter((user) => user.id !== id);
      setContatos(newArray);
      toast.success("Usuário deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar usuário.");
    };

    setOnEdit(null);
  };

  const getContatos = async () => {
    try {
      const res = await api.get("/");
      setContatos(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao carregar contatos.");
    };
  };

  useEffect(() => {
    getContatos();
  }, []);

  useEffect(() => {
    if (onEdit) {
      nameRef.current.value = onEdit.name;
      phoneRef.current.value = onEdit.phone;
    } else {
      nameRef.current.value = "";
      phoneRef.current.value = "";
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const phone = phoneRef.current.value;

    const user = {
      name,
      phone,
    };

    try {
      if (onEdit) {
        await api.put(`${onEdit.id}`, user);
        toast.success("Contato atualizado com sucesso!");
      } else {
        await api.post("/", user);
        toast.success("Contato adicionado com sucesso!");
      };

      getContatos();
      setOnEdit(null);
    } catch (error) {
      toast.error("Erro ao salvar o contato.");
    };
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("Logado");
    try {
      await api.post(`logout`);
      navigate("/");
    } catch (error) {
      toast.warning("Erro ao fazer logout");
    };
  };

  return (
    <Container>
      <Section>
        <FormContainer>
          <Title>Lista de Contatos</Title>
          <FormArea ref={formRef} onSubmit={handleSubmit}>
            <InputArea>
              <Label>Nome</Label>
              <Input name="name" ref={nameRef} />
            </InputArea>
            <InputArea>
              <Label>Telefone</Label>
              <Input name="phone" type="phone" ref={phoneRef} />
            </InputArea>
            <Button type="submit">Adicionar</Button>
            <ButtonLogout onClick={handleLogout}>
              Sair
            </ButtonLogout>
          </FormArea>
        </FormContainer>

        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Telefone</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contatos.map((item, index) => (
                <Tr key={item.id} isEven={index % 2 === 0}>
                  <Td>{item.name}</Td>
                  <Td>{item.phone}</Td>
                  <Td>
                    <ActionsContainer>
                      <ButtonIcon onClick={() => handleDelete(item.id)}>
                        <FaTrash />
                      </ButtonIcon>
                      <ButtonIcon
                        onClick={() => handleEdit(item)}
                        color="#037e84"
                      >
                        <FaEdit />
                      </ButtonIcon>
                    </ActionsContainer>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Section>
    </Container>
  );
}
