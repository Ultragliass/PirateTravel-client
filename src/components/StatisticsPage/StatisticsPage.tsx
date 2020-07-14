import { IVacation } from "../../models/vacation";
import { useStatisticsPageStyles } from "./styles";
import React from "react";
import { ChartData, HorizontalBar } from "react-chartjs-2";
import { Grid, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

interface StatisticsPageProps {
  vacations: IVacation[];
}

export function _StatisticsPage(props: StatisticsPageProps) {
  const { vacations } = props;

  const classes = useStatisticsPageStyles();

  const data: ChartData<any> = {
    labels: [],
    datasets: [
      {
        label: "# OF FOLLOWERS",
        data: [],
        backgroundColor: "pink",
        borderColor: "red",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
    title: {
      display: true,
      text: "Live vacation followers",
      fontSize: 25,
    },
    maintainAspectRation: false,
  };

  vacations.forEach((vacation) => {
    const { id, destination, followers } = vacation;

    if (followers) {
      data.labels.push(`#${id} - ${destination}`);

      data.datasets[0].data.push(followers);
    }
  });

  return (
    <div className={classes.content}>
      <div className={classes.buttons}>
        <Grid container justify="flex-start">
          <Grid item>
            <Link to="/vacations">
              <IconButton className={classes.button}>
                <ArrowBack />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </div>
      <HorizontalBar data={data} options={options} width={130} />
    </div>
  );
}
