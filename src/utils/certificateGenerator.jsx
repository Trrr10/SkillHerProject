import jsPDF from "jspdf";
import logo from "../assets/logo.png";

// Convert image to Base64
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
  partnerName = "Industry Partner",
  language = "en" // 👈 comes from dashboard
) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [800, 550],
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  /* ===== LANGUAGE TEXT (LIKE AFFIRMATIONS) ===== */
  const certificateText = {
    en: {
      title: "CERTIFICATE OF ACHIEVEMENT",
      presented: "This acknowledgement is officially presented to",
      dedication:
        "for their exceptional dedication and mastery of the curriculum in",
      partnerLabel: "ACCREDITED PARTNER",
      dateLabel: "COMPLETION DATE",
      officer: "CHIEF ACADEMIC OFFICER",
      watermark: "OFFICIAL GRADUATE",
    },
    hi: {
      title: "उपलब्धि प्रमाण पत्र",
      presented: "यह प्रमाण पत्र आधिकारिक रूप से प्रदान किया जाता है",
      dedication:
        "पाठ्यक्रम में उत्कृष्ट समर्पण और दक्षता के लिए",
      partnerLabel: "मान्यता प्राप्त भागीदार",
      dateLabel: "पूर्णता तिथि",
      officer: "मुख्य शैक्षणिक अधिकारी",
      watermark: "आधिकारिक स्नातक",
    },
    mr: {
      title: "यश प्रमाणपत्र",
      presented: "हे प्रमाणपत्र अधिकृतपणे प्रदान करण्यात येत आहे",
      dedication:
        "अभ्यासक्रमात उत्कृष्ट समर्पण व प्रावीण्य दाखविल्याबद्दल",
      partnerLabel: "मान्यताप्राप्त भागीदार",
      dateLabel: "पूर्णता दिनांक",
      officer: "मुख्य शैक्षणिक अधिकारी",
      watermark: "अधिकृत पदवीधर",
    },
  };

  const t = certificateText[language];

  /* ===== 1. BACKGROUND ===== */
  doc.setFillColor(254, 254, 250);
  doc.rect(0, 0, width, height, "F");

  /* ===== WATERMARK ===== */
  doc.setFont("times", "bold");
  doc.setFontSize(70);
  doc.setTextColor(242, 238, 225);
  doc.text(t.watermark, width / 2, height / 2 + 30, {
    align: "center",
    angle: 35,
  });

  /* ===== 2. BORDERS ===== */
  doc.setDrawColor(180, 140, 60);
  doc.setLineWidth(1.5);
  doc.rect(15, 15, width - 30, height - 30);

  doc.setLineWidth(5);
  doc.rect(25, 25, width - 50, height - 50);

  /* ===== 3. LOGO ===== */
  const logoBase64 = await imageToBase64(logo);
  doc.addImage(logoBase64, "PNG", width / 2 - 45, 45, 90, 90);

  /* ===== 4. TITLES ===== */
  doc.setFont("times", "bold");
  doc.setFontSize(42);
  doc.setTextColor(30);
  doc.text(t.title, width / 2, 175, {
    align: "center",
    charSpace: 3,
  });

  doc.setFont("times", "italic");
  doc.setFontSize(16);
  doc.setTextColor(120);
  doc.text(t.presented, width / 2, 205, { align: "center" });

  /* ===== 5. NAME ===== */
  doc.setFont("times", "bold");
  doc.setFontSize(55);
  doc.setTextColor(180, 140, 60);
  doc.text(userName, width / 2, 265, { align: "center" });

  /* ===== DIVIDER ===== */
  doc.setDrawColor(180, 140, 60);
  doc.setLineWidth(2);
  doc.line(width / 2 - 150, 280, width / 2 + 150, 280);
  doc.circle(width / 2, 280, 3, "F");

  /* ===== 6. COURSE ===== */
  doc.setFont("times", "normal");
  doc.setFontSize(19);
  doc.setTextColor(80);
  doc.text(t.dedication, width / 2, 320, { align: "center" });

  doc.setFont("times", "bolditalic");
  doc.setFontSize(28);
  doc.setTextColor(40);
  doc.text(`"${courseTitle}"`, width / 2, 360, {
    align: "center",
    maxWidth: width - 180,
  });

  /* ===== 7. FOOTER ===== */
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.setTextColor(120);
  doc.text(t.partnerLabel, 85, height - 125);

  doc.setFont("times", "normal");
  doc.setTextColor(60);
  doc.text(partnerName, 85, height - 110);

  doc.setFont("times", "bold");
  doc.text(t.dateLabel, width - 85, height - 125, { align: "right" });

  doc.setFont("times", "normal");
  doc.text(
    new Date().toLocaleDateString(language === "en" ? "en-IN" : "hi-IN"),
    width - 85,
    height - 110,
    { align: "right" }
  );

  /* ===== SIGNATURE ===== */
  doc.setFont("courier", "bolditalic");
  doc.setFontSize(20);
  doc.setTextColor(20);
  doc.text("SkillHer Team", width / 2, height - 175, { align: "center" });

  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text(t.officer, width / 2, height - 155, { align: "center" });

  /* ===== DOWNLOAD ===== */
  doc.save(
    `${userName.replace(/\s+/g, "_")}_${language}_Certificate.pdf`
  );
};
