import TelegramBot from 'node-telegram-bot-api';
const token = '7455061414:AAE2u6kGpeAsfahpaknIcjulKQ5pZnSGto0';
const webAppURL = 'https://tg-bot-react-vite-lime.vercel.app/'

console.log('hello bot 123');
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