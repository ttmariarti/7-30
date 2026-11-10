import styled from "styled-components";

const recipes = [
  {
    name: "Smoked salmon burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=720&q=85",
    time: "20 min",
    servings: 6,
    calories: 410,
    difficulty: 0,
  },
  {
    name: "Tomatoes with creamy feta",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=720&q=85",
    time: "15 min",
    servings: 3,
    calories: 600,
    difficulty: 0,
  },
  {
    name: "Spicy potato salad",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=720&q=85",
    time: "30 min",
    servings: 2,
    calories: 320,
    difficulty: 1,
  },
  {
    name: "Chicken biryani",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=720&q=85",
    time: "40 min",
    servings: 4,
    calories: 700,
    difficulty: 3,
  },
];

const difficultyLabels = {
  0: "Easy",
  1: "Medium",
  3: "Hard",
};

const Page = styled.main`
  width: min(1120px, calc(100% - 40px));
  margin: 56px auto;
`;

const Heading = styled.header`
  margin-bottom: 28px;

  span {
    color: #e87950;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h1 {
    margin: 8px 0;
    font-family: Georgia, serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    letter-spacing: -0.04em;
  }

  p {
    margin: 0;
    color: #77736b;
  }
`;

const RecipeGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const RecipeCard = styled.article`
  overflow: hidden;
  border: 1px solid ${({ $featured }) => ($featured ? "#f1a25b" : "#eee9df")};
  border-radius: 18px;
  background: #fff;
  box-shadow: ${({ $featured }) =>
    $featured ? "0 12px 30px #dc925833" : "0 8px 24px #4639230a"};
  transform: ${({ $featured }) => ($featured ? "translateY(-5px)" : "none")};
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px #46392318;
  }
`;

const RecipeImage = styled.img`
  display: block;
  width: 100%;
  height: 190px;
  object-fit: cover;
`;

const RecipeInfo = styled.div`
  padding: 16px;
`;

const RecipeName = styled.h2`
  min-height: 48px;
  margin: 0 0 12px;
  font-family: Georgia, serif;
  font-size: 1.15rem;
`;

const Details = styled.p`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 0;
  color: #77736b;
  font-size: 0.78rem;
`;

const DifficultyRow = styled.div`
  margin-top: 16px;
  padding: 12px;
  border-radius: 12px;
  background: ${({ $featured }) => ($featured ? "#fff0df" : "#fff9e8")};

  span {
    display: block;
    margin-bottom: 8px;
    color: #77736b;
    font-size: 0.72rem;
    font-weight: 700;
  }
`;

const DifficultyOptions = styled.div`
  display: flex;
  gap: 5px;
`;

const DifficultyOption = styled.div`
  flex: 1;
  padding: 5px 2px;
  border-radius: 999px;
  background: ${({ $active, $level }) => {
    if (!$active) return "#fff";
    if ($level === 0) return "#88b97e";
    if ($level === 1) return "#f0ac51";
    return "#e87950";
  }};
  color: ${({ $active }) => ($active ? "#fff" : "#918b80")};
  font-size: 0.62rem;
  font-weight: 700;
  text-align: center;
`;

function Difficulty({ difficulty }) {
  if (!Object.hasOwn(difficultyLabels, difficulty)) {
    throw new Error(`Unsupported recipe difficulty: ${difficulty}`);
  }

  return (
    <DifficultyRow $featured={difficulty === 3}>
      <span>Difficulty</span>
      <DifficultyOptions>
        {Object.entries(difficultyLabels).map(([level, label]) => (
          <DifficultyOption
            key={level}
            $active={Number(level) === difficulty}
            $level={Number(level)}
          >
            {label}
          </DifficultyOption>
        ))}
      </DifficultyOptions>
    </DifficultyRow>
  );
}

function App() {
  return (
    <Page>
      <Heading>
        <span>Fresh ideas for dinner</span>
        <h1>Recipe list</h1>
        <p>Simple favorites, made for sharing.</p>
      </Heading>
      <RecipeGrid aria-label="Recipe list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.name} $featured={recipe.difficulty === 3}>
            <RecipeImage src={recipe.image} alt={recipe.name} />
            <RecipeInfo>
              <RecipeName>{recipe.name}</RecipeName>
              <Details>
                <span>◷ {recipe.time}</span>
                <span>♧ {recipe.servings} servings</span>
                <span>{recipe.calories} calories</span>
              </Details>
              <Difficulty difficulty={recipe.difficulty} />
            </RecipeInfo>
          </RecipeCard>
        ))}
      </RecipeGrid>
    </Page>
  );
}

export default App;
