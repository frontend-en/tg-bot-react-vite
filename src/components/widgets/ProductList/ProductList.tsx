import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

import './ProductList.css'

const getTotalPrice = (addItems: addItemsType[]) => {
    return addItems.reduce((acc, item) => acc + item.price, 0)
}

type ProductType = {
    id: number
    title: string
    description: string
    price: number
    img: string
}
const productds: ProductType[] = [
    {
        id: 1,
        title: 'Телефон',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquam.',
        price: 100,
        img: 'https://picsum.photos/200/300',
    },
    {
        id: 2,
        title: 'Телевизор',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquam.',
        price: 100,
        img: 'https://picsum.photos/200/300',
    },
    {
        id: 3,
        title: 'Ноутбук',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquam.',
        price: 100,
        img: 'https://picsum.photos/200/300',
    },
    {
        id: 4,
        title: 'Наушники',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquam.',
        price: 100,
        img: 'https://picsum.photos/200/300',
    },
    {
        id: 5,
        title: 'Монитор',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquam.',
        price: 100,
        img: 'https://picsum.photos/200/300',
    },
    {
        id: 6,
        title: 'Куллер',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquam.',
        price: 100,
        img: 'https://picsum.photos/200/300',
    }
]

type addItemsType = {
    id: number
    count: number
    title: string
    description: string
    price: number
    img: string
}

const ProductList = () => {

    const [addItems, setAddItems] = useState<addItemsType[]>([])
    const { tg, queryId } = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            queryId,
            productds: addItems,
            getTotalPrice: getTotalPrice(addItems)
        }
        fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product: ProductType) => {
        const alreadyAdded = addItems.find(item => item.id === product.id)
        let newItems = [];

        if (alreadyAdded) {
            newItems = addItems.map(item => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        count: item.count + 1
                    }
                }
                return item
            })
        } else {
            newItems = [...addItems, { ...product, count: 1 }]
        }
        if (newItems.length <= 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Оформить заказ ${newItems.length} на сумму ${getTotalPrice(newItems)} ₽`
            })
        }

        setAddItems(newItems)
    }


    return (
        <div className={classNames('productList')}>
            {
                productds.map(item => <ProductItem key={item.id} product={item} onAdd={onAdd} />
                )
            }
        </div>
    )
}

export default ProductList;