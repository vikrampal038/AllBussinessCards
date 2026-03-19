export function generateVCard(contact) {
  return `BEGIN:VCARD
VERSION:3.0
FN:${contact.founderFirst} ${contact.founderLast}
ORG:${contact.companyName}
TITLE:${contact.title}
TEL;TYPE=CELL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.websiteHref}
ADR;TYPE=WORK:;;${contact.address};;;;
END:VCARD`;
}

export function saveVCardFile(content, fileName) {
  const blob = new Blob([content], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}
