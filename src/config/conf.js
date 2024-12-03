export const getClient = () => {
    const token = localStorage.getItem("token"); // Récupère directement le token

    if (!token) {
        console.warn("No token found in local storage");
        return null; // Retourne null si aucun token n'est trouvé
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
        },
    };
};
