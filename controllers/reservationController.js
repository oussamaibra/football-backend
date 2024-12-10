const db = require("../database/connexion");

exports.createReservation = async (req, res) => {
  const { court_id, reservation_date, start_time, duration_hours } = req.body;
  const userId = req.user.userId;

 
  // Définir la durée en minutes
  const durationMinutes = duration_hours * 60;
  const startTime = new Date(`${reservation_date} ${start_time}`);
  const endTime = new Date(
    startTime.getTime() + durationMinutes * 60000 + 10 * 60000
  ); // inclure 10 minutes de pause

  try {
    // Vérifier si le créneau est disponible
    const query = `
      SELECT * FROM reservations 
      WHERE court_id = ? 
      AND reservation_date = ?
      AND (
        (start_time BETWEEN ? AND ?) OR
        (? BETWEEN start_time AND DATE_ADD(start_time, INTERVAL duration_hours HOUR))
      )
    `;
    const [rows] = await db.execute(query, [
      court_id,
      reservation_date,
      start_time,
      endTime,
      start_time,
    ]);

    // Si une réservation existe déjà dans ce créneau
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Terrain déjà réservé pour ce créneau." });
    }

    // Insérer la nouvelle réservation
    const insertQuery = `
      INSERT INTO reservations (user_id, court_id, reservation_date, start_time, duration_hours) 
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.execute(insertQuery, [
      userId,
      court_id,
      reservation_date,
      start_time,
      duration_hours,
    ]);
    res.status(201).json({ message: "Réservation créée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la réservation :", error);
    res.status(500).json({ error: "Erreur lors de la réservation." });
  }
};
