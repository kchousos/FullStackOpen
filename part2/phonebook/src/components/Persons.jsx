const Person = ({ name, number }) => <li>{ name }: { number }</li>;

const Persons = ({ displayPerson }) => {
  return (
    <>
      <ul> 
        {displayPerson.map(p => <Person key={p.id} name={p.name} number={p.number}/>)}
      </ul>
    </>
  );
};

export default Persons;
