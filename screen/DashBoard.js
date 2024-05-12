import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import product from "../util/product";
import axios from "axios";

function DashBoard({ navigation }) {
    const [book, setBook] = useState([])
    const [order, setOrder] = useState({
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    })
    const [revenue, setRevenue] = useState({
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
            }
        ],
    })

    const colors = ["rgb(0,0,255)", "rgba(131, 167, 234, 1)", "#ffffff"]

    const loadBook = async () => {
        try {
            let data = await product.get('/book/getListProductInMonth')
            let tmp = data.data.map((value, index) => {
                return {
                    name: value.book.title,
                    population: value.number,
                    color: colors[index]
                }
            })
            if (tmp <= 3) {
                setBook(tmp)
            } else {
                setBook(tmp.slice(0, 3))
            }
        } catch (error) {
            console.log(error)
        }
    }


    const loadOrder = async () => {
        try {
            let data = await axios.get('http://103.72.97.224:5051/api/getOrderInYear')
            let tmp = []
            for (const [key, value] of Object.entries(data.data.data)) {
                tmp.push(value)
            }
            let month = [];
            for (let i = 1; i <= 12; i++) {
                let monthKey = (i < 10 ? '0' + i : i);
                month.push(monthKey);
            }
            setOrder({
                labels: month,
                datasets: [
                    {
                        data: tmp
                    }
                ]
            })
        } catch (error) {

        }
    }

    const loadRevenur = async () => {
        try {
            let data = await axios.get('http://103.72.97.224:5051/api/staticRevenueInYear')
            let tmp = []
            for (const [key, value] of Object.entries(data.data.data)) {
                tmp.push(value)
            }
            let month = [];
            for (let i = 1; i <= 12; i++) {
                let monthKey = (i < 10 ? '0' + i : i);
                month.push(monthKey);
            }
            setRevenue({
                labels: month,
                datasets: [
                    {
                        data: tmp
                    }
                ]
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        loadBook()
        loadOrder()
        loadRevenur()
    }, [])

    return (
        <View>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Wellcome</Text>
                </View>
                <View style={{ borderRadius: 10, elevation: 5, }}>
                    <PieChart
                        data={book}
                        width={Dimensions.get("window").width}
                        height={200}
                        chartConfig={{
                            // backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 0]}
                        absolute
                    />
                </View>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Order Each Month</Text>
                </View>
                <View style={{ borderRadius: 10, elevation: 5, }}>
                    <BarChart
                        data={order}
                        width={Dimensions.get("window").width}
                        height={250}
                        // yAxisLabel="$"
                        chartConfig={{
                            backgroundGradientFrom: "#007ACC", // Màu xanh bule
                            backgroundGradientTo: "#40C4FF", // Màu xanh nhạt hơn

                            color: (opacity = 1) => `black`,
                            // strokeWidth: 3, // optional, default 3
                            barPercentage: 0.3,
                            useShadowColorFromDataset: false, // optional
                        }}
                        showValuesOnTopOfBars={true}
                    // verticalLabelRotation={30}
                    />
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Revenue Each Month</Text>
                </View>
                <View style={{ borderRadius: 10, elevation: 5, }}>
                    <LineChart
                        data={revenue}
                        width={Dimensions.get("window").width}
                        height={256}
                        // verticalLabelRotation={30}
                        chartConfig={{
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            color: (opacity = 1) => `black`,
                            // strokeWidth: 3, // optional, default 3
                            // barPercentage: 0.3,
                            // useShadowColorFromDataset: false, // optional
                        }}
                        bezier
                    />
                </View>
            </ScrollView>
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
        marginBottom: 12,
        marginTop: 12,
        width: '100%',
    },
})

export default DashBoard;