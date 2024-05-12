import { Alert, Button, View, Text, StyleSheet } from "react-native"
function Manager({ navigation }) {
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Wellcome</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.divbutton}>
                    <Button
                        title="Manager Product"
                        onPress={() =>
                            navigation.navigate('ManagerProduct')
                        }
                    />
                </View>
                <View style={styles.divbutton}>
                    <Button
                        title="User Manage"
                        onPress={() => navigation.navigate('ManagerUser')}
                        color="black"
                    />
                </View>

                <View style={styles.divbutton}>
                    <Button
                        title="Dash board"
                        onPress={() => navigation.navigate('DashBoard')}
                        color="rgb(49,58,70)"
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center',
    },
    header: {
        marginBottom: 24,
        marginTop: 12,
        width: '100%'
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    divbutton: {
        width: "80%",
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
})
export default Manager