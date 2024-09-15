import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import cors from 'cors';

const token = '7455061414:AAE2u6kGpeAsfahpaknIcjulKQ5pZnSGto0';
const webAppURL = 'https://tg-bot-react-vite-lime.vercel.app/'

//////////////////// express / create server//////////////
const app = express()
app.use(cors())
app.use(express.json())

const PORT = 8080
////////////////////

//////////////////// web app ///////////////////////////
const bot = new TelegramBot(token, {
    polling: {
        interval: 300,
        autoStart: true
    }
})


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Заполни форму. Кнопка внизу', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Заказать', web_app: { url: webAppURL }
                    }],
                ],
            }
        })
        await bot.sendMessage(chatId, 'Заполни форму. Кнопка внизу', {
            reply_markup: {
                keyboard: [
                    [{
                        text: 'Нажми, чтобы заполнить форму', web_app: {
                            url: webAppURL + '/form'
                        }
                    }]
                ],
            }
        })
    }

    if (msg.web_app_data?.data) {
        try {
            const data = JSON.parse(msg.web_app_data?.data)


            await bot.sendMessage(chatId, `Ваша страна ${data.country}`)
            await bot.sendMessage(chatId, `Ваш город ${data.city}`)

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Спасибо за обратную связь')
            }, 3000)



        } catch (error) {

        }
    }

});

/// handler POST ///////////////
app.post('/web-data', async (req, res) => {
    const { queryId, productds, getTotalPrice } = req.body

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Спасибо за заказ',
            input_message_content: {
                message_text: `Ваш заказ ${productds} на сумму ${getTotalPrice} успешно оплачен`
            }
        })
        return res.status(200).json({ message: 'ok' })
    } catch (error) {
        await bot.answerWebAppQuery(queryId,{
            type: 'article',
            id: queryId,
            title: 'Ошибка',
            input_message_content:{
                message_text: 'Произошла ошибка при оплате'
            }
        })
        return res.status(500).json({ message: 'error' })
    }



})
/// lissen //////////
app.listen(PORT, () => {
    console.log('server is running on port ' + PORT);
})


