import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import product from '../util/product.js'
import ModalUpdateProduct from './ModalUpdateProduct.js';

const BookDetail = ({ route }) => {
    const { book_id } = route.params;
    const [book, setBook] = useState({
        title: '',
        price: '',
        quantity: '',
        author: '',
        description: '',
        category_id: '',
        image: '',
        category_name: ''
    })
    const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);

    const loadBook = async () => {
        try {
            let data = await product.get(`/book/${book_id}`)
            let tmp = data.data.data[0]
            tmp.category_name = tmp.category.name
            setBook(tmp)
        } catch (error) {
        }
    }
    useEffect(() => {
        loadBook()
    }, [])



    return (
        <View style={styles.container}>
            <View style={styles.upperSection}>
                <Image source={{ uri: book.image !== "" ? book.image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAAEDCAMAAAC/PkCYAAAARVBMVEXi39/h3t7////39/fHxcXEwcHZ1tbz8vLPzMzd2trX1NTb2NjKyMj6+vrS0dH29vbm5eXs7Oy8u7u4w9y4vtDp6em6t7dBt0usAAAFKElEQVR4nO3c7XaiMBSF4QRCyEnCgWiZ+7/UiR9UUKxQtR5d+/0zs9YUyAOI1DGoYvul9PumvraF2up3JmSE3qq3Pgq7suDdCRnx/gT95i+GQzDICAYZwSAjGGQEg4xgkBEMMoJBRjDI6MKgJAeDjGCQEQwygkFGMMgIBhnBICMYZASDjGCQEQwygkFGMMgIBhnBICMYZASDjGCQEQwygkFGMMgIBhnBICMYZASDjB5q0IodexuCZ+fC3YNa+eP3GiyTj7rrutS2ZdOUbd13nXLe8qrBE1MwoRui6Ciwfb5B+xBVl5qmuKxpOx39siMSbN4J56vJuyN1HTv6aV/cbzBpbvSjYdSZcetABu9UfX09eV+o6yfn/YbqZ8J+CD3zT6sIMaSbK6nNSw255K6eDRSpXLCG1xuKoos0O4DISwQyDEXJ7nLpYG6fRYIMRaGr84WdW7ywEEORNtNlIy1fVoqhaCeIqFcsKsZQtP9OS7o1BEGGovseiuNVCwoyFOyPWzbrlpNkKI4XJ9O+seE4lrhyMRg+00Deft9Ov6kh2lTnq/uLDNZwnNzK/8ZA+/emxr3GwD5vMJk7DeGw0mRfYdCHrZf6LoOujyvlVxiG3zYeYyhfchxc+wGGTzgOMMAAgzBDBYMIw0bDIMew9iMBiQb6AEOAAQYYPsRgCAYYYJga7PL/TYQBhg82uA8wMAwwwHBuWPctAZEGv+IrMzDAMF+AAQYYYIDhWYYOhtcaCAYYYIABhj83NO2ui7X+jaGsk2LveV/+U6V6brqSvmYo6549O1PtMi7/vUunL7Y/39D2lk0e92gins2Oin13/v36WUNTE1fWT+dVBrbR+b79C0MbnOPZmWP5p9lFO5nKOGOogxmmRVxE3rEqn2swFG9NSyU2VF81NF28NcmXHadnGujaDpwUXOxmDY02S+b2ajbueYbxqvJIv/NE069Ys1HNhUGZmV0wt9Wh5xk0x6oKirrhlCl7UtptYhxDvAlTQ392DLTOO8FsIvsQLMdNlfdFmFKeZODKkCrmS8H/i6ez3Vf9ydC4OFotxWpDdHHFTSH/QzztrmcYXOWvjX+oDLH6PmOcOX7O1/fV6VLm8jDr62to8oX3ON/i4YZ8/e9vAI7lnTkcjcP8i7AZZsBqXrSW+sB4sMHE8ZFvUt9x9Psi6z6dvUc3wczM21WhcjOAMu06n9meGfaxhuK0hbpjH63WwwtY52tSfttiPZ1Y3Md4dq1hY6fjbBNxfjVXnDdK+YbD23zDcfqRRrvmoYZjybKj+fnd5KPvxoOsnTmtS7vJgcz3K56jPrsiKyIbLV08bOCBhpZcuHKXMTjMhJHicEa5OD6JWu2v7IldITg7Pab3GdTp063k3Y+A4zaso9GNX78/FN6MjkHT8c1nilBwqnyYIRy3ntjOvpXOZN3o0pmq/EIY/XdcPpY3H15x2LAL9YMMKlDflr2/cac3jZiH7VM+m6rvA9PaFY91IT4o2vEl7leGvBtDWHSrN0473+7HvHt39vHwGikXnY3jteTfjPJVcDyiXxp+Fzn+fnRLiPmXo5bmH1ixrj81TLNMt5+Hs6QXGh4WDDKCQUYwyAgGGcEgIxhkBIOMYJARDDKCQUYwyAgGGcEgIxhkBIOMYJARDDKCQUYwyAgGGcEgIxhkBIOMYJARDDKCQUYwyGih4Q2DQUYwyAgGGcEgIxhkBIOMYJARDDKCQUYwyAgGGcEgIxhkBIOMYJDRtc/03yilvt4dkQXbV4/h7rb/AUFJwMduMUznAAAAAElFTkSuQmCC" }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{book.title}</Text>
                    <Text style={styles.text}><Text style={{ fontWeight: 700 }}>Price</Text>: {book.price}</Text>
                    <Text style={styles.text}><Text style={{ fontWeight: 700 }}>Quantity</Text>: {book.quantity}</Text>
                    <Text style={styles.text}><Text style={{ fontWeight: 700 }}>Author</Text>: {book.author}</Text>
                    <Text style={styles.text}><Text style={{ fontWeight: 700 }}>Category</Text>: {book.category_name}</Text>
                </View>
            </View>
            <View style={styles.lowerSection}>
                <Text style={styles.description}><Text style={{ fontWeight: 700 }}>Description</Text> : {book.description}</Text>
                <View style={styles.divbutton}>
                    <Button
                        title="Update Product"
                        onPress={() => setModalVisibleUpdate(true)}
                    />
                </View>

            </View>
            <ModalUpdateProduct
                visible={modalVisibleUpdate}
                onClose={() => setModalVisibleUpdate(false)}
                loadBook={loadBook}
                book={book}
            />
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    upperSection: {
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 150,
        marginRight: 20,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    lowerSection: {
        marginTop: 20,
    },
    description: {
        fontSize: 16,
    },
    divbutton: {
        width: "100%",
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
});

export default BookDetail;
