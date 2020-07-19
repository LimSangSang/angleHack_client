import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import Swiper from 'react-native-swiper';
import ResearchModal from '../components/ResearchModal';
import { colors } from '../libraries/colors';
import { goals } from '../libraries/goals';
import { readHome, getToDB } from '../libraries/httpRequest';

const styles = StyleSheet.create({
    wrapper: {},
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    itemBrand: {
        fontSize: 14
    },
    itemPrice: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    categoryTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 30,
        marginTop: 30
    }
})

const Home = ({ navigation }) => {
    const [modalStatus, setModalStatus] = useState(true);
    const [recommended, setRecommended] = useState([{ category1: '', category2: '', goal: 0, id: 2, name: '', picUrl: '', price: 0 }]);

    const [newItems, setNewItems] = useState([{ category1: '', category2: '', goal: 0, id: 2, name: '', picUrl: '', price: 0 }]);



    useEffect(() => {
        // return;
        (async () => {
            const data = await getToDB(readHome);
            setRecommended(data[0].recommended);
            setNewItems(data[1].new);
        })();
    }, []);

    const recommendedItem = (item) => {
        return <View key={item.id} style={{ height: '90%', width: 200, marginLeft: 30 }}>
            <View style={{ padding: 3, borderColor: colors.red, borderWidth: 1, borderRadius: 10, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.red }}>{goals[item.goal]}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DetailItem', { id: item.id })}>
                <View style={{
                    shadowColor: '#000',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#e3e3e3',
                    shadowColor: "#f2f2f2",
                    shadowOpacity: 0.85,
                    shadowRadius: 2,
                    shadowOffset: {
                        height: 5,
                        width: 5
                    },
                    backgroundColor: 'white'
                }}>


                    <Image
                        style={{
                            height: '70%',
                            width: '100%',
                        }}
                        source={{ url: item.picUrl }}
                    />
                    <View style={{
                        padding: 10, alignContent: 'space-between', marginTop: 5
                        // backgroundColor: 'yellow'
                    }}>
                        <Text style={styles.itemTitle}>{item.name}</Text>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 3 }}>
                            <Text style={styles.itemBrand}>{item.brand}</Text>
                            <Text style={styles.itemPrice}>{item.price}원</Text>

                        </View>
                    </View>
                </View >
            </TouchableOpacity>
        </View>
    }

    const newItem = (item) => {
        return <View key={`new - ${item.id}`} style={{ width: '100%', height: 350, paddingRight: 30, paddingLeft: 30 }}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailItem', { id: item.id })}>
                <View style={{ padding: 3, borderColor: colors.red, borderWidth: 1, borderRadius: 10, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.red }}>{goals[item.goal]}</Text>
                </View>
                <View style={{
                    shadowColor: '#000',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#e3e3e3',
                    shadowColor: "#f2f2f2",
                    shadowOpacity: 0.85,
                    shadowRadius: 2,
                    shadowOffset: {
                        height: 5,
                        width: 5
                    },
                    backgroundColor: 'white'
                }}>

                    <Image
                        style={{
                            height: '70%',
                            width: '100%',
                        }}
                        source={{ url: item.picUrl }}
                    />
                    <View style={{
                        padding: 5, alignContent: 'space-between', marginTop: 5
                        // backgroundColor: 'yellow'
                    }}>
                        <Text style={styles.itemTitle}>{item.name}</Text>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 3 }}>
                            <Text style={styles.itemBrand}>{item.brand}</Text>
                            <Text style={styles.itemPrice}>{item.price}원</Text>

                        </View>
                    </View>
                </View >
            </TouchableOpacity>
        </View>
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white', overflow: 'scroll' }}>
            <ResearchModal modalStatus={modalStatus} setModalStatus={setModalStatus} />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 300 }}>
                    <Swiper style={styles.wrapper} autoplay>
                        <View>
                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                source={require('../images/go_vegan.jpg')}
                            />
                        </View>
                        <View>
                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                source={require('../images/fair_trade_campaigns.png')}
                            />
                        </View>
                        <View>
                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                source={require('../images/csr.jpeg')}
                            />
                        </View>
                    </Swiper>
                </View>
                <View >
                    <Text style={styles.categoryTitle}>추천 상품</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ height: 290, width: '100%' }}
                        data={recommended}
                        renderItem={({ item }) => recommendedItem(item)}
                        horizontal
                        keyExtractor={(item) => `recommended-${item.id}`}
                    />
                    <Text style={styles.categoryTitle}>신상품</Text>
                    {newItems.map((item) => newItem(item))}
                    {/* <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    data={recommended}
                    renderItem={({ item }) => cardItem(item)}
                    keyExtractor={(item) => `new-${item.id}`}
                /> */}
                </View>
            </ScrollView>
        </View >
    );
}

export default Home;