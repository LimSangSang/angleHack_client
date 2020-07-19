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
    TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../libraries/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    categoryText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        textDecorationLine: 'underline',
        fontStyle: 'italic'
    }
})

const categoryTitle = [{ key: 1, label: 'Living' }, { key: 2, label: 'Acc' }, { key: 3, label: 'Beauty' }, { key: 4, label: 'Food' }];

const Category = ({ navigation }) => {
    const CategoryTitle = (item) => {
        return <TouchableOpacity onPress={() => navigation.navigate('CategoryItems', { label: item.label, key: item.key })}>
            <Text style={styles.categoryText}>{item.label}</Text>
        </TouchableOpacity>
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#f2f0f0', padding: 15, flexDirection: 'row', borderRadius: 30, margin: 30 }}>
                <Ionicons name='search-sharp' size={30} color='black' />
                <TextInput />
            </View>
            <View style={{ marginLeft: 30, marginRight: 30 }}>
                {categoryTitle.map(item => CategoryTitle(item))}
            </View>
        </SafeAreaView>
    );
}

export default Category;