import { useCallback, useEffect, useState } from "react"
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import product from '../util/product.js'
import { IconButton, MD3Colors } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import ModalCreateProduct from "./ModalCreateProduct.js";
import { useFocusEffect } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { debounce } from 'lodash';
const DeleteConfirmation = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text>Bạn có chắc muốn xoá không?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <IconButton icon="cancel" mode="outlined" size={20} onPress={onCancel} />
                            <IconButton icon="check" mode="outlined" color={MD3Colors.error50} size={20} onPress={onConfirm} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};


function ManagerProduct({ navigation }) {
    const [book, getListBook] = useState([])
    const [idDelete, setDelete] = useState(null)
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [modalVisibleCreate, setModalVisibleCreate] = useState(false);
    const [search, setSearch] = useState('');

    const handlePressDelete = (id) => {
        setDelete(id)
        setConfirmationVisible(true);
    };

    const showToast = (type = 'primary', message = '') => {
        Toast.show({
            type: type,
            text1: message,
        });
    }
    const handleConfirm = async () => {
        try {
            let data = await product.post(`/book/delete/${idDelete}`);
            showToast('success', 'xoá thành công')
            fetchBook();
            setConfirmationVisible(false);
        } catch (error) {
            showToast('error', 'xoá thất bại')
        }
    };

    const handleCancel = () => {
        setConfirmationVisible(false);
    };
    const fetchBook = async (title='') => {
        try {
            let data = await product.get(`/book/notPagingBook?title=${title}`)
            getListBook(data.data.data)
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchBook()
    }, [])

    useEffect(() => {
        debouncedSearch(search);
        return () => {
            debouncedSearch.cancel();
        };
    }, [search]);

    const debouncedSearch = debounce((searchText) => {
        fetchBook(searchText)
    },300);


    useFocusEffect(
        useCallback(() => {
            // getListBook([])
            // Thực hiện tải lại danh sách ở đây
            fetchBook();
        }, [])
    );


    const updateSearch = (search) => {
        setSearch(search)
    };

    const renderBook = ({ item }) => {
        return (
            <Pressable onPress={() =>
                navigation.navigate('BookDetail', { book_id: item.id })}
            >
                <View style={styles.item}>
                    <View style={styles.title}>
                        <Text numberOfLines={1} ellipsizeMode="tail">{item.id}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.textAlignRight} numberOfLines={1} ellipsizeMode="tail">{item.price}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.textAlignCenter} numberOfLines={1} ellipsizeMode="tail">{item.quantity}</Text>
                    </View>
                    <View style={styles.title} >
                        <IconButton
                            icon="trash-can"
                            mode="outlined"
                            iconColor={MD3Colors.error50}
                            size={20}
                            onPress={() => handlePressDelete(item.id)}
                        />
                    </View>
                </View>
            </Pressable>
        );
    };
    return (
        <View>
            <View>
                <DeleteConfirmation
                    visible={confirmationVisible}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={updateSearch}
                        value={search}
                    />
                </View>
                <View>
                    <View>
                        <View style={styles.header}>
                            <View style={styles.title}>
                                <Text>#</Text>
                            </View>
                            <View style={styles.title}>
                                <Text>Title</Text>
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.textAlignRight}>Price</Text>
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.textAlignRight}>Number</Text>
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.textAlignCenter}>Action</Text>
                            </View>
                        </View>
                        <FlatList
                            data={book}
                            renderItem={renderBook}
                            keyExtractor={item => item.id.toString()}
                            // contentContainerStyle={styles.flatListContainer}
                            numColumns={1}
                            style={{height: '87%'}}

                        // columnWrapperStyle={styles.columnWrapper}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.iconPlus}>
                <IconButton
                    icon="plus"
                    mode="contained"
                    iconColor="white"
                    backgroundColor="lightblue"
                    size={40}
                    onPress={() => setModalVisibleCreate(true)}
                />
            </View>
            <ModalCreateProduct
                visible={modalVisibleCreate}
                onClose={() => setModalVisibleCreate(false)}
                fetchBook={fetchBook}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    iconPlus: {
        position: 'absolute',
        top: 600,
        right: 20,
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    textAlignRight: {
        textAlign: 'right'
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 15,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        // with : '100%',
        // height : 70
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderStyle: 'solid',
        with: '100%'

    },
    square: {
        with: 48,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#53d6f2',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    number: {
        fontWeight: 'bold',
        color: '#fff'
    },
    title: {
        color: '#fff',
        overflow: 'hidden',
        flex: 1,
    },
    columnWrapper: {
        // justifyContent: 'space-between',
    },
})

export default ManagerProduct