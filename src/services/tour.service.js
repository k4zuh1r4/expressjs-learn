export default class TourService {
    constructor() { }
    static async getAllTours() {
        //db call
        return {
            msg: "getAllTours"
        }
    }
    static async createTour(tour) {
        return {
            msg: "createTour"
        }
    }
    static async getTourById(id) {
        return {
            msg: "getTourById"
        }
    }
    static async updateTourById(id, tour) {
        return {
            msg: "updateTourById"
        }
    }
    static async deleteTourById(id) {
        return {
            msg: "deleteTourById"
        }
    }
}