import { useState, useEffect } from "react";
import TinderCard from 'react-tinder-card';
import {database} from './firebase';
import './TinderCard.css';
import {useSelector} from "react-redux";
import {selectUser} from './features/userReducer';

function TinderCards() {
    const user = useSelector(selectUser)
    const [people, setPeople] = useState([]);
    const [userData, setUserData] = useState('');

    const getUser = async() => {
    const currentUser = database
            .collection('people')
            .doc(user.uid)
            .get()
            .then((document) => {
                setUserData(document.data());
            })
    }
  
    useEffect(() => {
        getUser();
        }, []);


    const swiped = async (direction, name, id, url) => {
        if (direction == 'right') {
            await database
            .collection('people')
            .doc(user.uid)
            .collection('matches')
            .doc(id)
            .set({
                name: name,
                url: url
        });
            await (userData)
            const result = await database
                .collection('people')
                .doc(id)
                .collection('matches')
                .where('name', '==', user.displayName)
                .get()

            const find = await result.docs.map((user) => user.data().length > 0);
            if (find.length) {
                database
                    .collection('chats')
                    .add({
                    user: [{id: user.uid, name: user.displayName, url: userData.url},
                        {id: id, name: name, url: url}]
                });
            }}
        }

    useEffect(() => {
        database
            .collection("people")
            .onSnapshot((snapshot) => {
                setPeople(snapshot.docs.map((doc) => 
                ({id: doc.id,
                ...doc.data()}) 
                ))}
            );
    }, []);




    return (
        <div> 
            <div className="tindeCard_container">
                {people.map((person) => {
                return person?.userName? (
                person.userName !== user.displayName ?
                    <TinderCard
                        className = "swipe"
                        key={person.userName}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, person.userName, person.id, person.url)}
                    >   
                    {person.url ?
                        <div 
                            style = {{ backgroundImage: `url(${person.url})` }}
                            className="card">
                            <h3>{person.userName}</h3>
                        </div> : ''}
                    </TinderCard>
                : '' )
                    : ''}
                )}
            </div>
        </div>
    )
  }
  
  export default TinderCards;
  