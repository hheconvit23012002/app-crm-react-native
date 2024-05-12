import { useEffect, useState } from "react"
import { Alert, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import user from '../util/user.js'
import { IconButton, MD3Colors } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { SearchBar } from 'react-native-elements';
import ModalCreateUser from "./ModalCreateUser.js";
import { debounce } from 'lodash';
import ModalUpdateUser from './ModalUpdateUser.js'

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


function ManagerUser({ navigation }) {
    const [users, setListUser] = useState([])
    const [idDelete, setDelete] = useState(null)
    const [userUpdate, setUserUpdate] = useState({})

    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [modalVisibleCreate, setModalVisibleCreate] = useState(false);
    const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);

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
            let data = await user.post(`/deleteUser`, {
                user_id: idDelete
            });
            showToast('success', 'xoá thành công')
            fetchUsers();
            setConfirmationVisible(false);
        } catch (error) {
            console.log(error)
            showToast('error', 'xoá thất bại')
            setConfirmationVisible(false);
        }
    };

    const handleCancel = () => {
        setConfirmationVisible(false);
    };
    const fetchUsers = async (name = '') => {
        try {
            let data = await user.get(`/getListUser?name=${name}`)
            setListUser(data.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        debouncedSearch(search);
        return () => {
            debouncedSearch.cancel();
        };
    }, [search]);

    const debouncedSearch = debounce((searchText) => {
        fetchUsers(searchText)
    }, 300);


    // useFocusEffect(
    //     useCallback(() => {
    //         fetchUsers();
    //     }, [])
    // );



    const updateSearch = (search) => {
        setSearch(search)
    };

    const renderUser = ({ item }) => {
        return (
            <Pressable onPress={() => { setUserUpdate(item); setModalVisibleUpdate(true) }}
            >
                <View style={styles.item}>
                    <View style={styles.title}>
                        <Text numberOfLines={1} ellipsizeMode="tail">{item.id}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text numberOfLines={1} ellipsizeMode="tail">{item.email}</Text>
                    </View>
                    <View style={styles.title}>
                        <Text numberOfLines={1} ellipsizeMode="tail">{item.phone_number}</Text>
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
                    <View >
                        <View style={styles.header}>
                            <View style={styles.title}>
                                <Text>#</Text>
                            </View>
                            <View style={styles.title}>
                                <Text>Name</Text>
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.textAlignCenter}>Email</Text>
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.textAlignCenter}>Phone</Text>
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.textAlignCenter}>Action</Text>
                            </View>
                        </View>
                        <FlatList
                            data={users}
                            renderItem={renderUser}
                            keyExtractor={item => item.id.toString()}
                            numColumns={1}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            style={{height: '88%'}}
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
            <ModalCreateUser
                visible={modalVisibleCreate}
                onClose={() => setModalVisibleCreate(false)}
                fetchUsers={fetchUsers}
            />
            <ModalUpdateUser
                visible={modalVisibleUpdate}
                onClose={() => setModalVisibleUpdate(false)}
                fetchUsers={fetchUsers}
                userUpdate={userUpdate}
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
        justifyContent: 'space-between',
    },
})

export default ManagerUser