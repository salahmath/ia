import React, { useEffect, useState } from "react";
import { NotificationOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
import { getClient } from "../../config/conf";


const { Header, Content, Footer, Sider } = Layout;
const client = getClient()
const Navbar = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]); // Liste des conversations
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Charger les conversations depuis le backend
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/conversation",client); // Backend endpoint
        setConversations(response.data); // Mettre à jour la liste des conversations
      } catch (error) {
        console.error("Erreur lors du chargement des conversations :", error);
      }
    };

    fetchConversations();
  }, []);

  // Créer une nouvelle conversationclient  
  const createNewChat = async () => {
    try {
      const token = localStorage.getItem("token"); // Récupérer le token JWT
      if (!token) {
        console.error("Aucun token trouvé. Veuillez vous connecter.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:5000/conversation",
        {}, // Données supplémentaires (si nécessaire) pour créer une conversation
        client
      );
  
      navigate(`/chat/${response.data._id}`); // Rediriger vers la nouvelle conversation
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle conversation :", error);
      if (error.response && error.response.status === 401) {
        alert("Votre session a expiré. Veuillez vous reconnecter.");
      } else {
        alert("Erreur lors de la création de la conversation.");
      }
    }
  };
  

  // Générer les éléments du menu dynamiquement
  const menuItems = [
    {
      key: "create",
      label: "Create a new chat",
      onClick: createNewChat,
    },
    {
      key: "chats",
      label: "Liste de Chats",
      icon: <NotificationOutlined />,
      children: conversations.map((chat) => ({
        key: chat._id,
        label: `Chat ${chat._id.slice(-4)}`, // Utiliser une partie de l'ID comme label
        onClick: () => navigate(`/chat/${chat._id}`), // Rediriger vers la conversation
      })),
    },
  ];

  return (
    <Layout>
      {/* Header Section */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <div className="logo">
          <img
            src="https://static.vecteezy.com/system/resources/previews/012/986/755/non_2x/abstract-circle-logo-icon-free-png.png"
            alt="logo"
          />
        </div>
       <div>
        <span className="userId">Welcome, {localStorage.getItem("userId")}</span>
        
       </div>
      </Header>

      {/* Main Content Section */}
      <Content style={{ padding: "0 48px" }}>
        <br />
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Sider */}
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              items={menuItems}
              defaultSelectedKeys={["home"]}
              style={{
                height: "100%",
                width: 256,
              }}
            />
          </Sider>

          {/* Outlet for Nested Routes */}
          <Content style={{ padding: "0 80px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        SALAH IA ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Navbar;
