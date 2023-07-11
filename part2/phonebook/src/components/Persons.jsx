const Person = ({ name, number, deletePerson }) => {
  return (
    <li>
      { name }: { number }
      <button onClick={deletePerson}>delete</button>
    </li>
  )
}

const Persons = ({ displayPerson, deletePerson }) => {
  return (
    <>
      <ul> 
        {displayPerson.map(p =>
          <Person
            key={p.id}
            name={p.name}
            number={p.number}
            deletePerson={() => deletePerson(p.id)}/>)}
      </ul>
    </>
  );
};

export default Persons;
