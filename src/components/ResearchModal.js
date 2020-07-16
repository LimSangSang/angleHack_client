import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    ScrollView,
    TouchableOpacity,
    Button
} from 'react-native';
const styles = StyleSheet.create({
    checkboxContainer: {
        borderRadius: 10, borderColor: '#a3a3a3', width: '100%', borderWidth: 2, padding: 15, fontSize: 20, margin: 5
    },
    checkedCheckboxContainer: {
        borderRadius: 10, borderColor: '#ca5e51', width: '100%', borderWidth: 2, padding: 15, fontSize: 20, margin: 5
    },
    checkboxText: {
        color: '#a3a3a3', fontWeight: 'bold'
    },
    checkedCheckboxText: {
        color: '#ca5e51', fontWeight: 'bold'
    },
    questionBox: {
        width: '100%', padding: 30, shadowColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#e3e3e3',
        shadowColor: "#f2f2f2",
        shadowOpacity: 0.85,
        shadowRadius: 2,
        shadowOffset: {
            height: 5,
            width: 0
        },
        backgroundColor: 'white'
    }
})

const questionTitle = [{ key: 1, value: '당신은 어떤 것에 관심이 있습니까? 해당되는 모든 것을 선택하시오' }, { key: 2, value: '당신은 어떤 일을 하시나요?' }, { key: 3, value: '당신은 어떤 제품들을 가장 선호하나요?' }, { key: 4, value: '유엔에서 지정한 지속개발목표 중 어느 주제에 관심을 가지시나요?' }];

// 

const question1 = [{ key: 1, value: '주류 및 식품' }, { key: 2, value: '취미' }, { key: 3, value: '생활 용품' }, { key: 4, value: '화장품 및 뷰티' }];

const question2 = [{ key: 1, value: '직장인' }, { key: 2, value: '사무직' }, { key: 3, value: '전문직' }, { key: 4, value: '가사 담당' }, { key: 5, value: '기타' }];

const question3 = [{ key: 1, value: '업사이클링' }, { key: 2, value: '공정거래' }, { key: 3, value: '재활용' }, { key: 4, value: '유기농' }, { key: 5, value: 'CSR 제품' }, { key: 6, value: '친환경' }, { key: 7, value: '브랜드' }, { key: 8, value: '비건/채식주의' }];

const question1Value = { 1: false, 2: false, 3: false, 4: false };
const question2Value = { 1: false, 2: false, 3: false, 4: false, 5: false };
const question3Value = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false };

const ResearchModal = ({ modalStatus }) => {
    const [question1Checked, setQuestion1Checked] = useState(question1Value);
    const [question2Checked, setQuestion2Checked] = useState(question2Value);
    const [question3Checked, setQuestion3Checked] = useState(question3Value);
    // const [question4Checked, setQuestion4Checked] = useState(question4Value);
    const questionCheckbox = (item, questionValue, questionChecked, setQuestionChecked) => {
        return <TouchableOpacity key={item.key} style={questionChecked[item.key] ? styles.checkedCheckboxContainer : styles.checkboxContainer} onPress={() => setQuestionChecked({ ...questionValue, [item.key]: item.key })}>
            <Text style={questionChecked[item.key] ? styles.checkedCheckboxText : styles.checkboxText}>{item.value}</Text>
        </TouchableOpacity>
    }
    const questionContainer = (questionTitle, checkboxItem, questionValue, questionChecked, setQuestionChecked) => {
        return <View style={styles.questionBox}>
            <Text style={{ fontSize: 18, lineHeight: 30 }}>{questionTitle.value}</Text>
            {checkboxItem.map(item => questionCheckbox(item, questionValue, questionChecked, setQuestionChecked))}
        </View>
    }
    return (

        <Modal
            style={{
                flex: 1,
                borderTopStartRadius: 8,
                backgroundColor: 'red',
            }}
            animationType='slide'
            visible={modalStatus}
            onRequestClose={() => { }}>

            <SafeAreaView style={{ flex: 1, margin: 30 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
                        <View>
                            <Text style={{ fontSize: 26, fontWeight: 'bold', lineHeight: 40 }}>{`당신의 취향을 \n \t찾아드릴게요`}</Text>
                        </View>
                        <View >
                            <Image
                                style={{
                                    height: 24,
                                    width: 24,
                                }}
                                source={require('../images/close.png')}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        {questionContainer(questionTitle[0], question1, question1Value, question1Checked, setQuestion1Checked)}
                        {questionContainer(questionTitle[1], question2, question2Value, question2Checked, setQuestion2Checked)}
                        {questionContainer(questionTitle[2], question3, question3Value, question3Checked, setQuestion3Checked)}

                        <View style={{ backgroundColor: '#a4c196', padding: 10, borderRadius: 10 }}>
                            <Button title='확인' color='white' backgroundColor='blue' />
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
}

export default ResearchModal;