import classNames from "classnames";
import { useTelegram } from "../../hooks/useTelegram";

import './Form.css'
import { useCallback, useEffect, useState } from "react";

const Form = () => {
    const { tg } = useTelegram()

    const [formData, setFormData] = useState({
        country: '',
        city: '',
        subject: 'physical'
    })

    const onSendData = useCallback(() => {
        const data = {
            ...formData,
            subject: formData.subject === 'physical' ? 'Физ. лицо' : 'Юр. лицо'
        }
        tg.sendData(JSON.stringify(data))
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if (!formData.city || !formData.country) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [formData.city, formData.country])

    const handleChangeFormData = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <form action="#" className={classNames("form")}>
            <h3>Введите ваши данные</h3>
            <input type="text" name="country" onChange={(e) => handleChangeFormData(e)} value={formData.country} className={classNames("input")} placeholder="Страна" />
            <input type="text" name="city" onChange={(e) => handleChangeFormData(e)} value={formData.city} className={classNames("input")} placeholder="Город" />
            <select value={formData.subject} onChange={(e) => handleChangeFormData(e)} name="subject" id="" className={classNames("select")}>
                <option value="physical">Физ. лицо</option>
                <option value="legal">Юр. лицо</option>
            </select>
        </form>
    )
}

export default Form;