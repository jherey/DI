import Agenda from 'agenda';

/**
  *@description Function to configure Agenda
  *@param  {MongoConnection} mongoClientInstance
  *@param  {Object} config
  *@returns {object} - factory Agenda instance
  */
const agendaFactory = ({ db: mongoClientInstance, config }) => {
  try {
    const options = {
      mongo: mongoClientInstance,
      db: { collection: config.agenda.dbCollection },
      processEvery: config.agenda.pooltime,
      maxConcurrency: config.agenda.concurrency,
    };

    return new Agenda(options);
  } catch (error) {
    throw error;
  }
};

export default agendaFactory;
