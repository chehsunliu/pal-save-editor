import { Card, CardContent, Typography } from "@material-ui/core";
import { CharacterId } from "app/util/editor";
import React from "react";
import StatSection from "app/feature/characters/StatSection";

interface CharacterCardProps {
  name: string;
  characterId: CharacterId;
}

const CharacterCard = (props: CharacterCardProps) => {
  const { characterId, name } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {name}
        </Typography>
        <StatSection characterId={characterId} />
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
