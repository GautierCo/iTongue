module.exports = {
  getSubject: username => {
    return `Bienvenue sur iTongue ${username}`;
  },
  getPlain: username => {
    return `Bienvenue sur iTongue ${username}`;
  },
  getHtml: (username, activateLink) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width" name="viewport"/>
    <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
      <!--<![endif]-->
    <title>iTongue</title>
    <style type="text/css">
      body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
      }
      h1 {
        font-size: 3em;
      }
      h2 {
        font-size: 2em;
      }
      .container {
        border: 0px solid red;
      }
      .itongue__header {
        background-color: #505050;
        text-align: center;
        padding-top: 5rem;
        color: #fe734c;
      }
      .itongue__title {
        background-color: white;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
      }
      .itongue__title > h2 {
        padding: 3rem;
        margin: 0;
      }
      .itongue__body {
        background-color: #e7e7e7;
        padding-bottom: 5rem;
        text-align: center;
      }
      .itongue__content {
        text-align: left;
        background-color: white;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
      }
      .content {
        border-top: 1px solid lightgray;
        padding: 4rem; 
        margin: 0 3rem;
      }
      .content__title {
        font-weight: bold;
      }
      .content__block {
        text-align: center;
        padding: 1rem;
        margin-top: 3rem;
        margin-bottom: 3rem;
      }
      .--activate {
        background-color: rgb(189, 228, 189);
        border: 1px solid rgb(101, 134, 101);
      }
      .--faq {
        background-color: #fdeeea;
        border: 1px solid #eeb09f;
      }
      .itongue__footer {
        background-color: #505050;
        color: white;
        padding: 3rem;
      }
      .unsubscribe {
        font-size: 1rem;
        margin-top: 2rem;
        color: rgb(136, 136, 136);
      }
      .unsubscribe__link {
        color: rgb(136, 136, 136);
      }
      .unsubscribe__link:hover {
        color: rgb(73, 73, 73);
      }
    </style>
  </head>
  <body style="font-family: Arial, Helvetica, sans-serif; margin: 0;">
    <div class="itongue__header" style ="background-color: #505050;text-align: center;padding-top: 5rem;color: #fe734c;">
      <h1 style="font-size: 3rem;">iTongue</h1>
      <div class="itongue__title" style ="background-color: white;width: 80%;margin-left: auto;margin-right: auto;">
        <h2 style="font-size: 2em;padding: 3rem;margin: 0;">Bienvenue sur iTongue !</h1>
      </div>
    </div>

    <div class="itongue__body" style ="background-color: #e7e7e7;padding-bottom: 5rem;text-align: center;">
      <div class="itongue__content" style ="text-align: left;background-color: white;width: 80%;margin-left: auto;margin-right: auto;margin-top: 0;">
        <div class="content" style ="border-top: 1px solid lightgray;padding: 4rem; margin: 0 3rem;">

          <h3 class="content__title" style="background-color: white;width: 80%;margin-left: auto;margin-right: auto;font-weight: bold;">Bienvenue ${username} !</h3>

          <p style="font-weight: bold;">
            Nous sommes très heureux de te compter pami nous.
          </p>
          <div class="content__block --activate" style ="text-align: center;padding: 1rem;margin-top: 3rem;margin-bottom: 3rem;background-color: rgb(189, 228, 189);border: 1px solid rgb(101, 134, 101);">
            <span>
              Une dernière petite chose à faire, activer ton compte en cliquant sur le bouton.
            </span>
            </p>
            <button>Activer mon compte</button>
          </div>


          <p>Tu peux aussi coller ce lien dans ton navigateur :</p>
          <a style="color:#fe734c" href="${activateLink}">${activateLink}</a>


          <div class="content__block --faq" style ="text-align: center;padding: 1rem;margin-top: 3rem;margin-bottom: 3rem;background-color: #fdeeea;border: 1px solid #eeb09f;">
            <p>
              Si tu as des questions, n'hésite pas à nous les poser en répondant directement à cet email, nous
              serons toujours heureux d'y répondre 😉
            </p>
            <p>
              Si tu es timide ou que tu préfères lire, on a aussi une <a href="#" target="_blank">FAQ</a>
            </p>
          </div>
          
          <p>A très vite ! 👋</p>
          <p>L'équipe iTongue,</p>

        </div>
        <div class="itongue__footer" style ="background-color: #505050;color: white;padding: 3rem;">
          <p>
            Tu as reçu cet email car tu viens de t'enregistrer sur iTongue. Si il ne s'affiche pas
            correctement, tu peux le consulter directement sur ton navigateur.
          </p>

          
          <p>iTongue - 2 Rue Nogué, 64000 Pau</p>
        </div>
      </div>
      <p class="unsubscribe">Si tu ne veux plus recevoir nos email, tu peux te <a href="#" target="_blank" class="unsubscribe__link">désinscrire</a>.</p>
    </div>
  </body>
</html>
    `;
  }
};
