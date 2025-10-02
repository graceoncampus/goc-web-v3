const formData = require("form-data"); // or built-in FormData
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendDriverEmail = async (car, date, emailMessage) => {
  console.log("Attempting to send email", {
    driverExists: !!car.driver,
    driverEmail: car.driver?.email,
    riderCount: car.riders?.length,
    dateProvided: !!date,
    emailMessageProvided: !!emailMessage,
  });
  if (
    car.driver &&
    car.driver.email &&
    car.riders &&
    car.riders.length > 0 &&
    date &&
    emailMessage
  ) {
    const { name, email } = car.driver;
    const carRiders = car.riders;
    // const formattedDate = moment(date).format("M/D/YY");
    const message =
      `Hi ${name}! :)\n\n` +
      `Thanks for offering to drive this ${date}!\n\n` +
      `Here are your riders:\n\n${carRiders
        .map((r) => `${r.name}: ${r.phone} | ${r.pickup_location}`)
        .join("\n")}\n\n${
        car.comment && car.comment !== "" ? `Comments: ${car.comment}` : ""
      }\n\n${emailMessage ? `${emailMessage}\n\n` : ""}Thanks!\n` +
      "Rides Team\n" +
      "gocrides@gmail.com | (310) 694-5216";

    const riders = carRiders.map((r) => {
      let times = "";
      if (r.morning === "m") {
        times += "Morning ";
      }
      if (r.evening === "e") {
        times += "Evening ";
      }
      if (r.staying === "s") {
        times += "Staying ";
      }
      return `<b>${
        r.name
      }</b>${r.phone || r.pickup_location ? "<br />" : ""}${r.phone ? ` ☎️ ${r.phone}` : ""}${r.pickup_location ? ` 📍 ${r.pickup_location}` : ""}${times ? `<br/>Services: ${times}` : ""}<br/><br/>`;
    });
    const riderString = riders.join(" "); // remove comma delimiters from riders array
    console.log("Message created. Sending..");
    try {
      await mg.messages.create("graceoncampus.org", {
        to: email,
        bcc: "gocrides@gmail.com",
        from: "Grace on Campus Rides Team <gocrides@gmail.com>",
        subject: `Rides ${date}`,
        text: message,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml"><head> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Rides</title> <style type="text/css"> @media (max-width: 600px){.email-content{margin: 0 !important;}}@media (max-width: 600px){.email-body_inner{width: 100% !important;}.email-footer{width: 100% !important;}}</style></head><body style="width: 100% !important; height: 100%; margin: 0; line-height: 1.4; background-color: #F2F4F6; color: #3a3f4b; -webkit-text-size-adjust: none; box-sizing: border-box; color: #3a3f4b; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; height: 100%; line-height: 1.4; margin: 0; width: 100% !important;" bgcolor="#F2F4F6"> <style type="text/css"> @media (max-width: 600px){.email-content{margin: 0 !important;}}@media (max-width: 600px){.email-body_inner{width: 100% !important;}.email-footer{width: 100% !important;}}</style> <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; width: 100%;" bgcolor="#f9f9f9"> <tr> <td align="center" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word;"> <table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 24px 0; border-radius: 3px; box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 0; width: 100%;"> <tr> <td class="email-masthead" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 25px 0; word-break: break-word;" align="center"> <a href="https://example.com" class="email-masthead_name" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: bold; text-decoration: none; text-shadow: 0 1px 0 white;"> <img style="margin: 30px 0; max-width: 200px; text-align: center" src="https://res.cloudinary.com/goc/image/upload/v1507845999/Fill-16_ozm9l3.png"/> </a> </td></tr><tr> <td class="email-body" width="100%" cellpadding="0" cellspacing="0" style="-premailer-cellpadding: 0; -premailer-cellspacing: 0; border-bottom-color: #ecedef; border-bottom-style: solid; border-bottom-width: 1px; border-top-color: #ecedef; border-top-style: solid; border-top-width: 1px; box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; width: 100%; word-break: break-word;" bgcolor="#FFFFFF"> <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0 auto; padding: 0; width: 570px;" bgcolor="#FFFFFF"> <tr> <td class="content-cell" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 35px; word-break: break-word;"> <p style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal; margin-top: 0;" align="left">Greetings ${name},</p><p style="box-sizing: border-box; color: #3a3f4b; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5em; margin: 0;" align="left">Thank you for offering to drive on ${date}! We greatly appreciate your service to the body.</p><br/> <p style="box-sizing: border-box; color: #3a3f4b; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5em; margin-top: 0;" align="left">Here are your riders:</p><table class="attributes" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid rgba(0,0,0,.125); border-radius: 5px;box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0 0 21px;"> <tr> <td class="attributes_content" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 16px; word-break: break-word;" bgcolor="#fff"> <table width="100%" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"> <tr> <td class="attributes_item" style="color:#3a3f4b; box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 0; word-break: break-word;font-size:18px"> <span style="font-size:14px; letter-spacing: 0.5px; color:#848895">Riders</span> <br/>${riderString}</td></tr></table> </td></tr></table> <p style="box-sizing: border-box; color: #3a3f4b; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5em; margin-top: 0;" align="left">${
          emailMessage ? `${emailMessage}\n\n` : ""
        }</p><p style="box-sizing: border-box; color: #3a3f4b; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5em; margin-top: 0;" align="left">Thanks! <br/>Rides Team<br/> gocrides@gmail.com | (310) 694-5216 </p></td></tr></table> </td></tr><tr> <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word;"> <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0 auto; padding: 0; text-align: center; width: 570px;"> <tr> <td class="content-cell" align="center" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 35px 35px 0; word-break: break-word;"> <p class="sub align-center" style="box-sizing: border-box; color: #AEAEAE; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.5em; margin-top: 0;" align="center">© 2017 <a style="text-decoration: none;color:#539ab9" href="https://graceoncampus.org">Grace on Campus</a> <br/>A Ministry of <a style="text-decoration: none;color:#539ab9" href="https://gracechurch.org">Grace Community Church</a> </p></td></tr></table> </td></tr></table> </td></tr></table></body></html>`,
      });
      console.log("Email sent to " + car.driver?.email);
      return true;
    } catch (e) {
      console.log("Email failed to send " + car.driver?.email);
      console.log(e);
      return false;
    }
  } else {
    console.log(`Couldn't email ${JSON.stringify(car)}`);
  }
};

module.exports = {
  sendDriverEmail,
};
