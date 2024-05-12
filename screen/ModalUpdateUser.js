import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import user from '../util/user.js'
const ModalUpdateProduct = ({ visible, onClose, fetchUsers, userUpdate }) => {
    const [submit, setSubmit] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone_number: '',
        address: '',
        date_birth: '',
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

    const submitUser = async () => {
        try {
            setSubmit((pre) => {
                return !pre
            })
            let data = await user.post(`/adminUpdate/${userUpdate.id}`,formData)
            showToast('success','update user success')
            setSubmit((pre) => {
                return !pre
            })
            fetchUsers()
            onClose();
        } catch (error) {
            setSubmit((pre) => {
                return !pre
            })
            console.log("okok")
            onClose();
            showToast('error','update user error')
        }
        setFormData({
            email: '',
            password: '',
            name: '',
            phone_number: '',
            address: '',
            date_birth: '',
        })
    }

    useEffect(() => {
        setFormData(userUpdate)
    }, [userUpdate])


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
                                <Text style={{ fontSize: 20, fontWeight: '700' }}>Update User</Text>
                                <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
                                    <Text style={styles.closeText}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={{ height : 300}}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChangeText={(text) => handleInputChange('name', text)}
                                />
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChangeText={(text) => handleInputChange('email', text)}
                                />
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChangeText={(text) => handleInputChange('password', text)}
                                />
                                <Text style={styles.label}>Phone</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter phone"
                                    value={formData.phone_number}
                                    onChangeText={(text) => handleInputChange('phone_number', text)}
                                    keyboardType="numeric"

                                />
                                <Text style={styles.label}>Address</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter address"
                                    value={formData.address}
                                    onChangeText={(text) => handleInputChange('address', text)}
                                />
                                {/* <Text style={styles.label}>Date birth</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter date birth"
                                    value={formData.date_birth}
                                    onChangeText={(text) => handleInputChange('date_birth', text)}
                                /> */}
                            </ScrollView>

                            <Button title="Submit" disabled={submit} onPress={() => {
                                // Handle submit logic here
                                // For example, you can console log the form data
                                console.log(formData);
                                submitUser()
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

export default ModalUpdateProduct;
