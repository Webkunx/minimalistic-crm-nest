import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseGuards,
  Logger,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product-dto";
import { UpdateProductDto } from "./dto/update-product-dto";
import { AuthGuard } from "@nestjs/passport";
import { Product } from "./product.interface";

@UseGuards(AuthGuard())
@Controller("products")
export class ProductsController {
  private logger = new Logger("ProductsController");
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllproducts(): Promise<Product[]> {
    this.logger.verbose("Retrieving all products");
    return this.productsService.getAllProducts();
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    this.logger.verbose(
      `Creating Product with data: ${JSON.stringify(createProductDto)}`,
    );
    return this.productsService.createProduct(createProductDto);
  }

  @Get(":id")
  async getProductById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Product> {
    return this.productsService.getProductById(id);
  }
  @UsePipes(ValidationPipe)
  @Put(":id")
  async updateProduct(
    @Param("id", ParseIntPipe) id: number,
    @Body()
    updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(":id")
  async removeProduct(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.removeProduct(id);
  }
}
