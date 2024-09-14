const TelegramBot = require('node-telegram-bot-api');
const token = '7455061414:AAE2u6kGpeAsfahpaknIcjulKQ5pZnSGto0';
const webAppURL = 'https://www.youtube.com/watch?v=MzO-0IYkZMU'

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
                    [{ text: 'Стикер', callback_data: 'sticker' },
                    { text: 'Круглое Видео', callback_data: 'circleVideo' },
                {
                    text: 'Заказать', web_app: {url: webAppURL}
                }],
                ],
            }
        })
        await bot.sendMessage(chatId, 'Заполни форму. Кнопка внизу', {
            reply_markup: {
                keyboard: [
                    [{
                        text: 'Нажми, чтобы заполнить форму'
                    }]
                ],
            }
        })
    }

});