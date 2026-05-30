export default function Privacy() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px", fontFamily: "sans-serif", color: "#333" }}>
      <h1 style={{ color: "#667eea" }}>Politique de confidentialité</h1>
      <p><em>Dernière mise à jour : 30 mai 2026</em></p>

      <h2>1. Données collectées</h2>
      <p>Kalorix collecte les données suivantes : adresse email, données nutritionnelles saisies (repas, calories, macros), poids et objectifs santé.</p>

      <h2>2. Utilisation des données</h2>
      <p>Vos données sont utilisées uniquement pour faire fonctionner le service Kalorix : afficher votre historique, calculer vos objectifs et vous envoyer des rappels journaliers.</p>

      <h2>3. Stockage des données</h2>
      <p>Vos données sont stockées de manière sécurisée via Supabase. Nous ne vendons jamais vos données à des tiers.</p>

      <h2>4. Emails</h2>
      <p>Nous pouvons vous envoyer des emails de rappel journalier. Vous pouvez vous désabonner à tout moment en nous contactant.</p>

      <h2>5. Cookies</h2>
      <p>Kalorix utilise des cookies essentiels pour maintenir votre session de connexion. Aucun cookie publicitaire n'est utilisé.</p>

      <h2>6. Vos droits</h2>
      <p>Vous avez le droit d'accéder, modifier ou supprimer vos données à tout moment. Contactez-nous pour toute demande.</p>

      <h2>7. Contact</h2>
      <p>For any questions, please <a href="https://docs.google.com/forms/d/e/1FAIpQLSdI8IYoNx3iy6Z1-Or67H_6lEw7AjaABpBHnkHPv7SVfN6qxQ/viewform" style={{ color: "#667eea" }}>contact us here</a>.</p>
    </main>
  );
}
