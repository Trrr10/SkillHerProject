import jsPDF from "jspdf";
import logo from "../assets/logo.png";


// Convert image to Base64 (Enhanced with higher quality)
const imageToBase64 = (imgPath) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgPath;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
  });
};

export const generateCertificate = async (
  userName,
  courseTitle,
  partnerName = "Industry Partner"
) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [800, 550],
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  /* ===== 1. BACKGROUND & LUXURY WATERMARK ===== */
  doc.setFillColor(254, 254, 250); // Premium Cream/Ivory
  doc.rect(0, 0, width, height, "F");
  
  // Background Pattern (Subtle)
 

  // Large Focal Watermark
  doc.setFontSize(70);
  doc.setTextColor(242, 238, 225);
  doc.setFont("times", "bold");
  doc.text("OFFICIAL GRADUATE", width / 2, height / 2 + 30, { align: "center", angle: 35 });

  /* ===== 2. ARCHITECTURAL BORDERS ===== */
  // Layered Gold Border
  doc.setDrawColor(180, 140, 60); 
  doc.setLineWidth(1.5);
  doc.rect(15, 15, width - 30, height - 30); // Outer thin
  
  doc.setLineWidth(5);
  doc.rect(25, 25, width - 50, height - 50); // Main thick gold

  // Modern Corner Accents (L-Brackets)
  doc.setFillColor(60, 50, 30); // Dark Bronze
  const cSize = 40;
  doc.rect(20, 20, cSize, 10, "F"); doc.rect(20, 20, 10, cSize, "F"); // Top Left
  doc.rect(width - 20 - cSize, 20, cSize, 10, "F"); doc.rect(width - 30, 20, 10, cSize, "F"); // Top Right
  doc.rect(20, height - 30, cSize, 10, "F"); doc.rect(20, height - 20 - cSize, 10, cSize, "F"); // Bottom Left
  doc.rect(width - 20 - cSize, height - 30, cSize, 10, "F"); doc.rect(width - 30, height - 20 - cSize, 10, cSize, "F"); // Bottom Right

  /* ===== 3. LOGO (Centered) ===== */
  const logoBase64 = await imageToBase64(logo);
  doc.addImage(logoBase64, "PNG", width / 2 - 45, 45, 90, 90);

  /* ===== 4. TITLES ===== */
  doc.setFont("times", "bold");
  doc.setFontSize(42);
  doc.setTextColor(30, 30, 30); 
  doc.text("CERTIFICATE OF ACHIEVEMENT", width / 2, 175, { align: "center", charSpace: 3 });

  doc.setFont("times", "italic");
  doc.setFontSize(16);
  doc.setTextColor(120, 110, 90);
  doc.text("This acknowledgement is officially presented to", width / 2, 205, { align: "center" });

  /* ===== 5. RECIPIENT NAME (The Highlight) ===== */
  doc.setFont("times", "bold");
  doc.setFontSize(55);
  doc.setTextColor(180, 140, 60); // Pure Gold
  doc.text(userName, width / 2, 265, { align: "center" });

  /* ===== 6. DECORATIVE DIVIDER ===== */
  doc.setDrawColor(180, 140, 60);
  doc.setLineWidth(2);
  doc.line(width / 2 - 150, 280, width / 2 + 150, 280);
  doc.setFillColor(180, 140, 60);
  doc.circle(width / 2, 280, 3, "F"); // Center dot in divider

  /* ===== 7. COURSE DESCRIPTION ===== */
  doc.setFont("times", "normal");
  doc.setFontSize(19);
  doc.setTextColor(80, 80, 80);
  doc.text("for their exceptional dedication and mastery of the curriculum in", width / 2, 320, { align: "center" });

  doc.setFont("times", "bolditalic");
  doc.setFontSize(28);
  doc.setTextColor(40, 35, 25);
  doc.text(`"${courseTitle}"`, width / 2, 360, { align: "center", maxWidth: width - 180 });

  /* ===== 8. FOOTER DATA ===== */
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.setTextColor(120);
  
  // Left Footer: Partner
  doc.text("ACCREDITED PARTNER", 85, height - 125);
  doc.setFont("times", "normal");
  doc.setTextColor(60);
  doc.text(`${partnerName}`, 85, height - 110);

  // Right Footer: Date
  doc.setFont("times", "bold");
  doc.setTextColor(120);
  doc.text("COMPLETION DATE", width - 85, height - 125, { align: "right" });
  doc.setFont("times", "normal");
  doc.setTextColor(60);
  doc.text(`${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`, width - 85, height - 110, { align: "right" });

  /* ===== 9. PROFESSIONAL SEAL (Code-Generated) ===== */
  const sealX = width / 2;
  const sealY = height - 110;
  doc.setDrawColor(180, 140, 60);
  doc.setLineWidth(1.5);
  doc.circle(sealX, sealY, 35, "S"); // Outer circle
  doc.circle(sealX, sealY, 30, "S"); // Inner circle
  
  // Ribbon under seal
  doc.setFillColor(180, 140, 60);
  doc.triangle(sealX - 15, sealY + 25, sealX - 25, sealY + 60, sealX - 5, sealY + 50, "F");
  doc.triangle(sealX + 15, sealY + 25, sealX + 25, sealY + 60, sealX + 5, sealY + 50, "F");
  
  doc.setFontSize(9);
  doc.setFont("times", "bold");
  doc.text("VERIFIED", sealX, sealY - 5, { align: "center" });
  doc.text("SKILLHER", sealX, sealY + 8, { align: "center" });

  // Signature Section
  doc.setFont("courier", "bolditalic");
  doc.setFontSize(20);
  doc.setTextColor(20);
  doc.text("Skill Her Team", width / 2, height - 175, { align: "center" });
  
  doc.setDrawColor(150, 150, 150);
  doc.setLineWidth(1);
  doc.line(width / 2 - 110, height - 170, width / 2 + 110, height - 170);
  
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text("CHIEF ACADEMIC OFFICER", width / 2, height - 155, { align: "center" });

  /* ===== 10. AUTHENTICITY FOOTER ===== */
  const certID = `SH-CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  doc.setFontSize(8);
  doc.setTextColor(180);
  doc.text(`To verify this certificate, visit: verify.skillher.com | ${certID}`, width / 2, height - 30, { align: "center" });

  /* ===== DOWNLOAD ===== */
  doc.save(`${userName.replace(/\s+/g, '_')}_Official_Certificate.pdf`);
};