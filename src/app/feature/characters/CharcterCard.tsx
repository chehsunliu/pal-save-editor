import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { Character } from "app/util/saveEditor";
import React from "react";

interface CharacterCardProps {
  name: string;
  character: Character;
}

const CharacterCard = (props: CharacterCardProps) => {
  const { name, character } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          狀態
        </Typography>
        <TextField variant="outlined" size="small" label="修行" value={character.stat.level} />
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
