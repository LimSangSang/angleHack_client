import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    FlatList,
    ImageBackground,
    TextInput
} from 'react-native';
import { colors } from '../libraries/colors';
import { readCategoryItem, getToDB } from '../libraries/httpRequest';
import { goals } from '../libraries/goals';

const keyToText = {
    1: '리빙',
    2: '악세사리',
    3: '화장품',
    4: '식품'
};

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

const CategoryItems = ({ route }) => {
    const { label, key } = route.params;
    const [categoryItems, setCategoryItems] = useState([{ category1: '', category2: '', goal: 0, id: 2, name: '', picUrl: '', price: 0 }])

    useEffect(() => {
        (async () => {
            console.log(`${readCategoryItem}${keyToText[key]}`)
            const data = await getToDB(`${readCategoryItem}${keyToText[key]}`);
            console.log(data)
            setCategoryItems(data)
        })();

    }, []);

    const categoryItem = (item) => {
        return <View style={{ width: '100%', height: 350, paddingRight: 30, paddingLeft: 30, marginTop: 20 }}>
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
        </View>
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ height: 100, width: '100%', borderBottomWidth: 1, borderBottomColor: colors.gray, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 20,
                    // textDecorationLine: 'underline',
                    fontStyle: 'italic'
                }}>{label}</Text>
            </SafeAreaView>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ height: '100%', width: '100%' }}
                data={categoryItems}
                renderItem={({ item }) => categoryItem(item)}
                keyExtractor={(item) => `category-${item.id}`}
            />
        </View>
    );
}

export default CategoryItems;