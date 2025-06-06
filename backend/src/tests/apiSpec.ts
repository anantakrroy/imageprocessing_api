import app from "../index";
import supertest from "supertest";
import resize from "../utils/resize";
import rotate from "../utils/rotate";
import metadata from "../utils/metadata";
import flip from "../utils/flip";
import blur from "../utils/blur";
import Info from "../interface/info";
import grayscale from "../utils/grayscale";
import direxists from "../middlewares/direxists";

const request = supertest(app);
const baseurl = "/api/images";

describe("Main test suite \n", () => {
  describe("TEST ALL ENDPOINTS \n", () => {
    it("should make successful request to home route", async () => {
      const res = await request.get(baseurl);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual("Home route...");
    });

    it("should make succesful request to /metadata route", async () => {
      const res = await request.get(`${baseurl}/metadata/mario`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        "format": "jpeg",
        "width": 194,
        "height": 259,
        "space": "srgb",
        "channels": 3,
        "depth": "uchar",
        "density": 72,
        "chromaSubsampling": "4:4:4",
        "isProgressive": false,
        "hasProfile": false,
        "hasAlpha": false
      });
    });

    it("should make succesful request to /resize route", async () => {
      const res = await request.get(
        `${baseurl}/resize?filename=mario&width=425&height=425`
      );
      expect(res.headers["content-length"]).toEqual('63');
      expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    });

    it("should make succesful request to /rotate route", async () => {
      const res = await request.get(
        `${baseurl}/rotate?filename=mario&angle=-270`
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body.format).toBe("jpeg");
      expect(res.body.width).toBe(259);
      expect(res.body.height).toBe(194);
    });

    it("should make succesful request to /grayscale route", async () => {
      const res = await request.get(`${baseurl}/grayscale?filename=mario`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe("Image color changed to grayscale");
    });

    it("should make succesful request to /flip route", async () => {
      const res = await request.get(`${baseurl}/flip?filename=mario`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe(
        "Image flipped successfully along vertical Y axis"
      );
    });

    it("should make succesful request to /blur route", async () => {
      const res = await request.get(`${baseurl}/blur?filename=mario&sigma=5`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe("Image blurred successfully");
    });
  });

  describe("TEST IMAGE PROCESSING METHODS \n", () => {
    it("Should resize the image", async () => {
      const operation = await resize("mario.jpg", 150, 150);
      expect(operation.width).toEqual(150);
      expect(operation.height).toEqual(150);
    })
  });
});
