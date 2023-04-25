import { PrismaClient, Prisma } from '@prisma/client'
import Twilio from 'twilio'

//biblioteca de logs 
//import winston from 'winston'

const prisma = new PrismaClient();

const twilio = new Twilio
  (
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

                                                                        /*
let today = Date.now();
let data = new Date(today);

const nomeInfoLog = `../../logs/bulk-sms-twilio/logSuccess_bulk-sms-twilio_${data.getFullYear()}-${(data.getMonth()+1 < 10 ? "0"+data.getMonth()+1 : data.getMonth()+1 )}-${(data.getDay() < 10 ? "0"+data.getDay() : data.getDay())}_${(data.getHours() < 10 ? "0"+data.getHours() : data.getHours())}-${(data.getMinutes() < 10 ? "0"+data.getMinutes() : data.getMinutes())}-${(data.getSeconds() < 10 ? "0"+data.getSeconds() : data.getSeconds())}.log`;
const nomeErrorLog = `../../logs/bulk-sms-twilio/logError_bulk-sms-twilio_${data.getFullYear()}-${(data.getMonth()+1 < 10 ? "0"+data.getMonth()+1 : data.getMonth()+1 )}-${(data.getDay() < 10 ? "0"+data.getDay() : data.getDay())}_${(data.getHours() < 10 ? "0"+data.getHours() : data.getHours())}-${(data.getMinutes() < 10 ? "0"+data.getMinutes() : data.getMinutes())}-${(data.getSeconds() < 10 ? "0"+data.getSeconds() : data.getSeconds())}.log`;

const infoLogConfiguration = {
  defaultMeta: { service: "log-service" },
  transports: [
      new winston.transports.File({
        level: 'info',
        filename: nomeInfoLog
      })
  ]
};

const errorLogConfiguration = {
  defaultMeta: { service: "log-service" },
  transports: [
      new winston.transports.File({
        level: 'error',
        filename: nomeErrorLog
      })
  ]
};

const infoLogger = winston.createLogger(infoLogConfiguration);
const errorLogger = winston.createLogger(errorLogConfiguration);
                                                                        */


async function main() {

  //ENVIO EM MASSA COM MENSAGEM UNICA

  /*

  const allUsers = await prisma.disparoMassaTwilio.findMany();

  const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

  const bindings = allUsers.map(user => {
    return JSON.stringify({ binding_type: 'whatsapp', address: user.Numero });
  });

  const body = `Olá, filiado do Cartão de TODOS.

  Você sabia que o seu verdinho oferece descontos em gás, farmácia, exames, consultas e ainda dá dinheiro de volta em lojas parceiras?
  
  Acesse a nossa página e não perca mais tempo! Utilize todos benefícios oferecidos pelo seu Cartão de TODOS  https://www.querodesconto.cartaodetodos.com.br/
  
  Juntos Podemos Mais 💚`;

  service.notifications
  .create({
        toBinding: bindings,
        body: body
  })
  .then(notification => {
        console.log(notification);
  })
  .catch(err => {
        console.error(err);
  });

  */


  //ENVIO INDIVIDUAL COM CUSTOMIZACAO DE MENSAGEM

  //const allUsers = [{Numero: '+5531999087769', NomeTitular:'VINICIUS'}];

  //essa versao roda tudo ou nada por causa do ALL

  // Promise.all(
  //   allUsers.map(user => {
  //     return twilio.messages.create({
  //       to: user.Numero,
  //       from: process.env.TWILIO_NUMBER_SHORT_CODE,
  //       body: `OLA${' '+user.NomeTitular}, o Cartao de TODOS passara por reajustes a partir de 1/1/23: Mensalidade RS29.70,Clinico geral RS26,Demais areas medicas RS35`
  //     });
  //   })
  // )
  // .then(messages => {
  //   console.log('Mensagens enviadas');
  // })
  // .catch(err => console.error(err));
  
  

  // const allUsers = [
  //   {Numero: '+553199908776978', NomeTitular:'MATEUS', Id_Pessoa: '123456'},
  //   {Numero: '+55', NomeTitular:'LUCAS', Id_Pessoa: '123456'},
  //   {Numero: '', NomeTitular:'BRUNA', Id_Pessoa: '123456'},
  //   {Numero: '', NomeTitular:'ANDRESSA', Id_Pessoa: '123456'},
  //   {Numero: '+5531999087769', NomeTitular:'VINICIUS', Id_Pessoa: '123456'}];

  // const promises = 
  //     allUsers.map(user => {
  //     return twilio.messages.create({
  //       to: user.Numero,
  //       from: process.env.TWILIO_NUMBER_SHORT_CODE,
  //       body: `OLA${' '+user.NomeTitular}, o Cartao de TODOS passara por reajustes a partir de 1/1/23: Mensalidade RS29.70,Clinico geral RS26,Demais areas medicas RS35`
  //     });
  //   });
  
  // let findManySkipTake = [];

//60000

  // for (let i = 0; i < 1; i++) {
  //   findManySkipTake.push({ 
  //     skip:i*50,
  //     take:50,
  //   });
  // }
/*
  findManySkipTake.push({skip:0, take:50});

  let allUsers = [];
  let posicao = [];

  for (const item of findManySkipTake) {
    const resultado = await prisma.disparoMassaTwilio.findMany(item);

    posicao = [];
    resultado.forEach(item => posicao.push(JSON.stringify({ binding_type: 'sms', address: item.Numero })) );
    allUsers.push(posicao);

    new Promise(resolve => setTimeout(resolve, 1500));
  } 

  const service = twilio.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

  // const bindings = allUsers.map(user => {
  //   return JSON.stringify({ binding_type: 'sms', address: user.Numero });
  // });


  const body = "OLA FILIADO(A), o Cartao de TODOS passara por reajustes a partir de 1/1/23: Mensalidade RS29.70,Clinico geral RS26,Demais areas medicas RS35";

  const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

  // const promises = 
  // allUsers.map(bindings => {
 
  //   delay(2000)
  //   .then( () => 
  //      service.notifications
  //     .create({
  //           toBinding: bindings,
  //           body: body
  //     })
  //     .then(notification => {
  //           console.log("SUCESSO");
  //           console.log(notification);
  //           infoLogger.info(notification);
  //     })
  //     .catch(err => {
  //           console.log("ERRO");
  //           console.error(err);
  //           errorLogger.error(err);
  //     })
  //   )
        
  //   }
  // );


*/


//ENVIO QUE FOI UTILIZADO NO DISPARO EM MASSA:

///*

  try
  {
    const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

    //for(let i = 0; i < 2; i++)
    //{

      setInterval( async () => {
  
        const skip = await prisma.disparoMassaTwilioContador.findMany();
  
        if(skip.length > 0)
        {
          let contador = skip[0].Contador;
    
          const updateUser = await prisma.disparoMassaTwilioContador.update({
            where: {
              Id: 1,
            },
            data: {
              Contador: contador+1,
            },
          });
    
          const allUsers = await prisma.disparoMassaTwilio.findMany(
            {
              skip:contador*50,
              take:50
            }
          );
    
          const promises = 
            allUsers.map(user =>
            
            delay(2000)
            .then( () => 
                          {
                            if(user.Numero){
                              if ((user.Numero.length == 14 || user.Numero.length == 23) && user.Numero != '') { 
                                return twilio.messages.create({
                                  to: user.Numero,
                                  from: process.env.TWILIO_NUMBER_SHORT_CODE,
                                  body: 
                                  // `Olá, filiado do Cartão de TODOS.

                                  // Você sabia que o seu verdinho oferece descontos em gás, farmácia, exames, consultas e ainda dá dinheiro de volta em lojas parceiras?
                                  
                                  // Acesse a nossa página e não perca mais tempo! Utilize todos benefícios oferecidos pelo seu Cartão de TODOS https://www.querodesconto.cartaodetodos.com.br/
                                  
                                  // Juntos Podemos Mais 💚`
                                  //`Aproveite seus descontos. Utilize todas as vantagens do seu Cartao de TODOS. Acesse https://hubs.ly/Q01t-w9H0`
                                  `${user.NomeTitular} o seu Cartao de TODOS ficara mais pratico em 2023! Agora a anuidade sera adicionada a mensalidade sendo 29,70 por mes+12x de 2,50`
                                });
                              }
                            }
                          }
                )
            );
          
          promises.push(new Promise(resolve => setTimeout(resolve, 1500)));
        
          Promise.allSettled(promises).
          then((results) => 
            results.forEach(result => {
              if (result.status === 'fulfilled' || result.status == 'fulfilled') {
                // if(result.reason !== 'undefined' && result.reason !== undefined){
                //   console.log("sucesso: " + result.status+" - "+result.reason);
                //   infoLogger.info("sucesso: " + result.status+" - "+result.reason);
                // }
                try
                {
                  console.log("sucesso: " + result.status+" - "+result.reason);
                  //infoLogger.info("sucesso: " + result.status+" - "+result.reason);
                }catch(err){}
              } 
              else 
              {
                console.log("erro: " + result.status+" - "+result.reason);
                //errorLogger.info("erro: " + result.status+" - "+result.reason);
              }
            })
          );
        }
  
      }, 2000);

    //}

  }
  catch(err){}

  //*/
  
}

main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    });


