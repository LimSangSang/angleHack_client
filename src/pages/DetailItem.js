import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    ScrollView,
    Alert,
    Button
} from 'react-native';
import { colors } from '../libraries/colors';
import { goals } from '../libraries/goals';
import { readDetailItem, getToDB, updateBuyItem, postToDB } from '../libraries/httpRequest';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const [detailStatus, setDetailStatus] = useState(true);
    const [reviewStatus, setReviewStatus] = useState(false);

    useEffect(() => {
        // return;
        (async () => {
            const data = await getToDB(`${readDetailItem}${id}`);
            setDetailItem(data);
            Image.getSize(data.detailUrl, (width, height) => {
                console.log(width, height);
                setImageHeight(height);
                setImageWeight(width)
            });
        })();
    }, []);

    const buyItem = async () => {
        console.log(`${updateBuyItem}productId=${detailItem.id}&userId=ddura`)
        const res = postToDB(`${updateBuyItem}productId=${detailItem.id}&userId=ddura`);
        console.log(res);
        if (!res) return alert('결제를 실패했습니다!');
        Alert.alert('결제 성공', '결제가 완료되었습니다!')
    }


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
                <View style={{ width: '100%', padding: 20, flexDirection: 'row', backgroundColor: '#f2f0f0' }}>
                    <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            setDetailStatus(true);
                            setReviewStatus(false);
                        }
                        }>
                            <Text style={{ color: detailStatus ? colors.red : 'black' }}>Detail</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            setDetailStatus(false);
                            setReviewStatus(true);
                        }
                        }>
                            <Text style={{ color: reviewStatus ? colors.red : 'black' }}>Review</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {reviewStatus && <View>

                </View>}
                {detailStatus && <View style={{ height: 4000, width: '100%', justifyContent: 'center' }}>
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
                </View>}
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={styles.footerItemContainer}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', backgroundColor: 'white' }}>{detailItem.price} 원</Text>
                </View>
                <View style={{ ...styles.footerItemContainer, backgroundColor: colors.red }}>
                    <TouchableOpacity onPress={buyItem}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Buy Now</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    );
}

export default DetailItem;