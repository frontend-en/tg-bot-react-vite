import classNames from "classnames";
import { Button } from "../../ui";
import { ProductItemProps } from "./types";

import './ProductItem.css'

const ProductItem = ({ className, product, onAdd }: ProductItemProps) => {

    const onAddHandler = () => {
        onAdd(product);  
    }

    return (
        <div className={classNames('productItem', className)}>
            <div className="img" />
            <div className="title">{product.title}</div>
            <div className="description">{product.description}</div>
            <div className="description">{product.price}
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className="add-btn" onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    )
}

export default ProductItem;