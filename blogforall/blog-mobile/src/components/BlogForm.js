import React, { useState, useContent } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';


const BlogForm = ({ onSubmit, initialValues, ScreenTitle }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [author, setAuthor] = useState(initialValues.author);
    const [content, setContent] = useState(initialValues.content);
 
    
        let numOfLinesCompany = 18;
     return(
         <View style={styles.loginContainer}>
             <Text style={{ fontWeight: '500', color: '#fff', fontSize: 35, marginVertical: 20 }}>{ScreenTitle}</Text>
             <TextInput
             name='title'
             placeholder='    Blog title'
             style={styles.textInput}
             onChangeText={text => setTitle(text)}
             value={title}
             />
             <TextInput 
             name='author'
             placeholder='    Author Name'
             style={styles.textInput}
             onChangeText={text => setAuthor(text)}
             value={author}
             />
 
         <TextInput
            
             name='content'
             placeholder='    Type your content here...'
             style={styles.textInput}
             multiline={true}
             numberOfLines={100000}
             numberOfLines={numOfLinesCompany}
             onChangeText={text => setContent(text)}
             value={content}
             />
 
             <TouchableOpacity onPress={() => onSubmit(title, author, content)} style={styles.ButtonContainer}>
                 <Text style={styles.ButtonText}>Post</Text>
             </TouchableOpacity>    
 
         </View>
         
     );
}

BlogForm.defaultProps = {
    initialValues: {
        title: '',
        author: '',
        content: ''
    },
    ScreenTitle: 'Create a Blog'
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        backgroundColor: '#0090fc'
      },
      textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderColor: 'gray',

        borderRadius: 10,
      },
        ButtonContainer: {
            elevation: 8,
            margin: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            width: '50%'
        },
        ButtonText: {
            fontSize: 18,
            color: '#0090fc',
            fontWeight: 'bold',
            alignSelf: 'center'
        }
    


});


export default BlogForm;