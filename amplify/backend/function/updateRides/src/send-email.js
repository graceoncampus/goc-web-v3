const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const DOMAIN = "graceoncampus.org"; // use the verified Mailgun domain
const FROM_EMAIL = `Grace on Campus Rides <rides@${DOMAIN}>`;
const REPLY_TO = "gocrides@gmail.com";

async function sendDriverEmail(car, date, emailMessage) {
  console.log("Attempting to send email", {
    driverExists: !!car.driver,
    driverEmail: car.driver?.email,
    riderCount: car.riders?.length,
    dateProvided: !!date,
    emailMessageProvided: !!emailMessage,
  });

  if (!car.driver?.email || !car.riders?.length || !date || !emailMessage) {
    console.log("Missing required fields, skipping email.");
    return false;
  }

  const { name, email } = car.driver;
  const ridersHtml = car.riders
    .map((r) => {
      const times = [
        r.morning === "m" && "Morning",
        r.evening === "e" && "Evening",
        r.staying === "s" && "Staying",
      ]
        .filter(Boolean)
        .join(" ");
      return `
        <b>${r.name}</b><br/>
        ${r.phone ? `☎️ ${r.phone}<br/>` : ""}
        ${r.pickup_location ? `📍 ${r.pickup_location}<br/>` : ""}
        ${times ? `Services: ${times}<br/>` : ""}
        <br/>
      `;
    })
    .join("");

  const plainText = `
Hi ${name},

Thanks for offering to drive this ${date}!

Here are your riders:

${car.riders
  .map((r) => `${r.name}: ${r.phone || ""} | ${r.pickup_location || ""}`)
  .join("\n")}

${car.comment ? `Comments: ${car.comment}` : ""}
${emailMessage}

Thanks,
Rides Team
${REPLY_TO} | (949) 295-6286 or (510) 925 3266
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
  <body style="font-family: Helvetica, Arial, sans-serif; background: #f8f9fa; color: #333;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" style="background:#fff; border-radius:8px; padding:24px; margin:20px auto;">
            <tr>
              <td align="center">
                <img src="https://res.cloudinary.com/goc/image/upload/v1507845999/Fill-16_ozm9l3.png"
                     alt="Grace on Campus" style="max-width:180px; margin-bottom:20px;"/>
              </td>
            </tr>
            <tr>
              <td>
                <p>Hi ${name},</p>
                <p>Thank you for offering to drive on <b>${date}</b>! We’re so grateful for your service to the body.</p>
                <p><b>Your Riders:</b></p>
                <div style="border:1px solid #ddd; border-radius:6px; padding:12px; background:#fafafa;">
                  ${ridersHtml}
                </div>
                ${car.comment ? `<p><b>Comments:</b> ${car.comment}</p>` : ""}
                ${emailMessage ? `<p>${emailMessage}</p>` : ""}
                <p>Thanks,<br/>Rides Team<br/>${REPLY_TO} | (949) 295-6286 or (510)-925-3266</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size:12px; color:#888; padding-top:20px;">
                © 2025 Grace on Campus · A Ministry of Grace Community Church<br/>
                <a href="https://graceoncampus.org" style="color:#539ab9;">graceoncampus.org</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  try {
    const response = await mg.messages.create(DOMAIN, {
      from: FROM_EMAIL,
      to: email,
      // Use CC or a “monitoring” tag instead of BCC (BCC often hurts deliverability)
      cc: "gocrides@gmail.com",
      "h:Reply-To": REPLY_TO,
      subject: `Rides ${date}`,
      text: plainText,
      html,
      "o:tag": ["rides-weekly"], // helps Mailgun analytics
      "o:tracking": true,
      "o:dkim": "yes", // ensure DKIM signing is on
    });

    console.log("✅ Email sent to", email, "Response:", response.id);
    return true;
  } catch (err) {
    console.error("❌ Email failed for", email, err.message);
    return false;
  }
}

module.exports = { sendDriverEmail };
