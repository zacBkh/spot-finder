import nodemailer from 'nodemailer'

const sendVerifEmail = async (userRecipient, userID) => {

    console.log("-- WELCOME TO NODE MAILER --")
    console.log(process.env.GOOGLE_USER,
        process.env.GOOGLE_PASSWORD,
        process.env.DOMAIN)

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_USER,
            pass: process.env.GOOGLE_PASSWORD
        },
        port: 587,
        secure: false, // true for 465, false for other ports
    });


    // Only tests connection and authentication but it does not check if the service allows you to use a specific envelope From address or not.
    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });


    const htmlToSend = `
    <h3> Hello ! [userName] ! </h3>
    <p> Thanks for registering. Just one more step... </p>
    <p> To activate accoutn, please follow this link : <a target = "_" href="${process.env.DOMAIN}/api/activate/user/${userID}"> Activate my Account </a> </p>
    <p> Thank you</p>`


    // send mail with defined transport object
    const mailOptions = await transporter.sendMail({
        // from: '"Fred Foo 👻" <foo@example.com>', // sender address
        from: process.env.GOOGLE_USER, // sender address 
        to: userRecipient,
        subject: "Activate your Spot Finder Account ✔", // Subject line
        text: "Hello world?", // plain text body
        html: htmlToSend, // html body
    });



    // transporter.sendMail(mailOptions, (err, result) => {
    //     if (err) {
    //         console.log("ERROR FROM MAILER -->", err);
    //         return false
    //     }
    //     console.log("email sent", result);
    // })



}
export default sendVerifEmail