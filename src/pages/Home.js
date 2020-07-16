import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import ResearchModal from '../components/ResearchModal';

const Home = () => {
    return (
        <View>
            <ResearchModal modalStatus={true} />
            <Text>hidfdf</Text>
        </View>
    );
}

export default Home;