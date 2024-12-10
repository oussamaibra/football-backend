const db = require('../database/connexion');

exports.getAllCourts = async (req, res) => {
  try {
    // Récupérer tous les terrains
    const query = 'SELECT * FROM stades';
    const [rows] = await db.execute(query);
    //

    // Vérifier si des terrains existent
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Aucun terrain trouvé.' });
    }

    // Retourner les terrains trouvés
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des terrains :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
