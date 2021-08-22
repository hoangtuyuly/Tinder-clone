import { useState, useEffect } from "react";
import TinderCard from 'react-tinder-card';
import {database} from './firebase';
import {useStateValue} from "./StateProvider";
import './TinderCard.css';

function TinderCards() {
    const [{user}, dispatch] = useStateValue();
    const [people, setPeople] = useState([]);
    const [userData, setUserData] = useState();
    const [id, setId] = useState();

    const getUser = () => {
    const currentUser = database
            .collection('people')
            .doc(user.uid)
            .get()
            .then((document) => {
                setUserData(document.data())
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
                url: url,
                ismatch: false
        });
            const result = await database
                .collection('people')
                .doc(id)
                .collection('matches')
                .where('name', '==', userData.userName)
                .get()

            const find = await result.docs.map((user) => user.data().length > 0);
            if (find.length) {
                database
                    .collection('people')
                    .doc(user.uid)
                    .collection('matches')
                    .doc(id)
                    .update({
                        ismatch: true
                    });
                database
                    .collection('people')
                    .doc(id)
                    .collection('matches')
                    .doc(user.uid)
                    .update({
                        ismatch: true
                    })
            }
        }}

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




    return user?.displayName ?(
        <div> 
            <div className="tindeCard_container">
                {people.map((person) => {
                return  person.userName !== userData.userName ?
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
                : '' })})
            </div>
        </div>
    ): '';
  }
  
  export default TinderCards;
  