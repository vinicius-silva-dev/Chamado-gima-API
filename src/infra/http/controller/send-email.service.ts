import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

type MensageSucess = {
  mensage: string
}

// Aqui é um arquivo muito comum no Nestjs, é um serviço separado que o controller vai usar, no arquivo controller eu crio uma propriedade no construtor que vai representar a class SendEmail. No método, do controller, acessamos o método do service e passamos os parêmetros, ja no retorno do controller vamos colocar o que  o método do service retorna.
@Injectable()
export class SendEmail {
  private transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      requireTLS: true, 
      auth: {
          user: "8eedca001@smtp-brevo.com",
          pass: process.env.PASS
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  async sendCode(to: string, codigo: string): Promise<MensageSucess> {
    await this.transporter.sendMail({
      from: `"Chamados Gima" <viniciusvss120@gmail.com>`,
      to,
      subject: "Código de verificação",
      text: "Token",
      html: `<input type="text" style="font-size: 45px" value=${codigo} disabled />`
    })
    
     return {
      mensage: 'Código enviado!'
     }
  }
}