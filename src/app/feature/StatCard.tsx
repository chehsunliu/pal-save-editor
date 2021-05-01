import { Card, CardContent, Typography } from "@material-ui/core";

interface StatCardProps {
  name: string;
}

const StatCard = (props: StatCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
          Ipsum
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
