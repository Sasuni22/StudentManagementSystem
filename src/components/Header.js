import "../styles/header.css";  // Import the header styles

export default function Header() {
  return (
    <header className="header">
      <div className="logo-text">
        <img src="/kdu logo.png" alt="KDU Logo" height="50" />
        <div className="text">
          <p>GENERAL SIR JOHN KOTELAWALA DEFENCE UNIVERSITY</p>
          <p>FACULTY OF COMPUTING</p>
          <p>DEPARTMENT OF COMPUTER SCIENCE</p>
        </div>
      </div>
      <div className="sms-text">
        <p>SMS</p>
      </div>
    </header>
  );
}
