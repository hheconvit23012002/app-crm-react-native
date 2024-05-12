import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import product from '../util/product.js'
import Toast from 'react-native-toast-message';

const ModalCreateProduct = ({ visible, onClose, fetchBook }) => {
    const [categories, setCategory] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        quantity: '',
        author: '',
        description: '',
        category_id: '',
        image: '',
    });

    const showToast = (type = 'primary', message = '') => {
        Toast.show({
            type: type,
            text1: message,
        });
    }

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const submitProduct = async () => {
        try {
            setSubmit((pre) => {
                return !pre
            })
            let data = await product.post('/book/store',formData)
            showToast('success','add product success')
            setSubmit((pre) => {
                return !pre
            })
            fetchBook()
            onClose();
        } catch (error) {
            console.log(error)
            onClose();
            showToast('error','add product error')
        }
        setFormData({
            title: '',
            price: '',
            quantity: '',
            author: '',
            description: '',
            category_id: '',
            image: '',
        })
    }

    const loadCategory = async () => {
        try {
            let data = await axios.get('http://103.72.97.224:5053/api/category')
            let tmp = data.data.data.map((value) => {
                return {
                    key : value.id,
                    value : value.name
                }
            })
            setCategory(tmp)
        } catch (error) {
        }
    }


    useEffect(() => {
        loadCategory()
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => onClose()}
        >
            <TouchableWithoutFeedback onPress={() => onClose()}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: '700' }}>Add Product</Text>
                                <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
                                    <Text style={styles.closeText}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={{ height : 300}}>
                                <Text style={styles.label}>Title</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter title"
                                    value={formData.title}
                                    onChangeText={(text) => handleInputChange('title', text)}
                                />
                                <Text style={styles.label}>Price</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChangeText={(text) => handleInputChange('price', text)}
                                    keyboardType="numeric"
                                />
                                <Text style={styles.label}>Quantity</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter quantity"
                                    value={formData.quantity}
                                    onChangeText={(text) => handleInputChange('quantity', text)}
                                    keyboardType="numeric"
                                />
                                <Text style={styles.label}>Author</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter author"
                                    value={formData.author}
                                    onChangeText={(text) => handleInputChange('author', text)}
                                />
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter description"
                                    value={formData.description}
                                    onChangeText={(text) => handleInputChange('description', text)}
                                />
                                <Text style={styles.label}>Category</Text>
                                <SelectList
                                    // onSelect={() => alert(selected)}
                                    setSelected={(value) => handleInputChange('category_id', value)}
                                    // fontFamily='lato'
                                    data={categories}
                                    // arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                                    // searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                                    search={false}
                                    boxStyles={{ borderRadius: 0 }} //override default styles
                                    defaultOption={{key : null, value : 'Select cateogry' }}   //default selected option
                                />
                                <Text style={styles.label}>Image URL</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter image URL"
                                    value={formData.image}
                                    onChangeText={(text) => handleInputChange('image', text)}
                                />
                            </ScrollView>

                            <Button title="Submit" disabled={submit} onPress={() => {
                                // Handle submit logic here
                                // For example, you can console log the form data
                                console.log(formData);
                                submitProduct()
                            }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
    },
    closeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
});

export default ModalCreateProduct;
