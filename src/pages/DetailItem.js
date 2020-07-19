import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    ScrollView,
    ImageBackground,
    Button
} from 'react-native';
import { colors } from '../libraries/colors';
import { goals } from '../libraries/goals';
import { readDetailItem, getToDB } from '../libraries/httpRequest';

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        borderTopWidth: 1,
        borderTopColor: colors.gray,
        backgroundColor: 'white',
        flexDirection: 'row',
        zIndex: 2
    },
    footerItemContainer: { width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    detailMainImg: {
        width: '100%',
        height: 200,
        backgroundColor: colors.gray
    },
    detailTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 20
    },
    detailBrand: {
        fontSize: 17,
        marginTop: 10,
        color: 'gray'
    },
    detailPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    }
})
const DetailItem = ({ route }) => {
    const { id } = route.params;
    const [detailItem, setDetailItem] = useState({});
    const [imageHeight, setImageHeight] = useState(0)
    const [imageWeight, setImageWeight] = useState(0)

    useEffect(() => {
        // return;
        (async () => {
            const data = await getToDB(`${readDetailItem}${id}`);
            console.log(data)
            setDetailItem(data);
            Image.getSize(data.detailUrl, (width, height) => {
                console.log(width, height);
                setImageHeight(height);
                setImageWeight(width)
            });
        })();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView >
                <View style={{
                    width: '100%',
                    height: 400,
                    backgroundColor: colors.gray
                }}>
                    <Image
                        style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'cover',
                            justifyContent: 'flex-start'
                        }}
                        source={{ url: detailItem.picUrl }}
                    />
                </View>
                <View style={{ marginRight: 30, marginLeft: 30, marginTop: 20, marginBottom: 20 }}>
                    <View>
                        <View style={{ padding: 3, borderColor: colors.red, borderWidth: 1, borderRadius: 10, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.red }}>{goals[detailItem.goal]}</Text>
                        </View>
                    </View>
                    <Text style={styles.detailTitle}>{detailItem.name}</Text>
                    <Text style={styles.detailBrand}>{detailItem.brand}</Text>
                    <Text style={styles.detailPrice}>{detailItem.price} 원</Text>




                </View>
                <View style={{ height: 4000, width: '100%' }}>
                    <Image
                        style={{
                            height: '100%',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            width: '100%',
                            resizeMode: 'contain'
                        }}
                        source={{ url: detailItem.detailUrl }}
                    />
                </View>
                {/* <Text>fasd</Text> */}
                {/* <ScrollView style={{ flex: 1 }}>
                    <ImageBackground
                        resizeMode='cover'
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        source={{ url: 'https://melixir.me/web/upload/NNEditor/20200617/0615_%E1%84%90%E1%85%A9%E1%84%82%E1%85%A5+%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B7_02_shop1_150515.jpg' }}
                    />
                </ScrollView> */}
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={styles.footerItemContainer}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', backgroundColor: 'white' }}>{detailItem.price} 원</Text>
                </View>
                <View style={{ ...styles.footerItemContainer, backgroundColor: colors.red }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Buy Now</Text>
                </View>

            </View>
        </View>

    );
}

export default DetailItem;