//node.js keras neural network to help classify orders using klustering and statisctic using regression
//ranked post based on info from the website


//import * as tf from '@tensorflow/tfjs-node'

const tf = require('@tensorflow/tfjs-node')

//for classification of things. given certain categories, it classifies and automaticly cluster order to be with their same type
//data: x_data: name encoded as text description, y_data: category
const model1 = tf.sequential({
    layers: [
      tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
      tf.layers.dense({units: 10, activation: 'softmax'}),
    ]
});

//regression to get an analysis on certain orders
//data: x_data: category score, category as hot vector and score, y_data: the likelability (between 0 and 1)
const model2 = tf.sequential({
    layers: [
      tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
      tf.layers.dense({units: 1}), //activation: 'softmax' no need for between 0-1 prediction score
    ]
});

console.log(model1.summary())

/* model.compile({
    optimizer: 'sgd',
    loss: 'mse',
    metrics: [tf.keras.metrics.RootMeanSquaredError()]
  });
 */

function train(model, x_data, y_data) {
    model.compile({
        optimizer: 'sgd',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });

    model.fit(x_data, y_data, {
        epochs: 10,
        batchSize: 32,
    }).then(info => {
        console.log('Final accuracy', info.history.acc);
    });
}

