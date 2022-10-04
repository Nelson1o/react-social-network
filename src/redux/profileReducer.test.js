import profileRuducer, { addPostActionCreator } from "./profileReducer";
import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

let state = {
    posts: [
        { id: 1, post: 'Hi, how are you?', likesCount: '15' },
        { id: 2, post: 'It\'s my first post', likesCount: '18' }
    ],
};

test('length of posts should ba incremented', () => {
    // 1. test data
    let action = addPostActionCreator("it-kamasutra.com");

    // 2. action
    let newState = profileRuducer(state, action);

    // 3. expectation
    expect (newState.posts.length).toBe(3);
});

test('message of new post should ba correct', () => {
    // 1. test data
    let action = addPostActionCreator("it-kamasutra.com");

    // 2. action
    let newState = profileRuducer(state, action);

    // 3. expectation
    expect (newState.posts[2].post).toBe("it-kamasutra.com");
});

test('after deleting length of message should be decrement', () => {
    // 1. test data
    let action = deletePost("it-kamasutra.com");

    // 2. action
    let newState = profileRuducer(state, action);

    // 3. expectation
    expect (newState.posts.length).toBe(2);
});