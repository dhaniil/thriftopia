<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BannerResource\Pages;
use App\Filament\Resources\BannerResource\RelationManagers;
use App\Models\Banner;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;


class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;
    protected static ?string $navigationIcon = 'heroicon-m-photo';
    protected static ?string $navigationGroup = 'Lainnya';
    protected static ?int $navigationSort = 100;


    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Forms\Components\Grid::make(2)
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Infromasi Banner')
                            ->description('Masukkan Informasi banner.')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                ->label('Judul')
                                ->required(),

                                Forms\Components\Textarea::make('description')
                                ->label('Deskripsi'),

                                Forms\Components\Card::make('Status Banner')
                                    ->schema([
                                        Forms\Components\Toggle::make('is_active')
                                        ->label('Aktif')
                                        ->default(true),
                                    ]),

                            ]),
                    ]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Card::make()
                            ->schema([
                        Forms\Components\FileUpload::make('image_path')
                                ->label('Banner')
                                ->image ()
                                ->directory('banners')
                                ->required()
                                ->helperText('Direkomendasikan Banner Dengan Ukuran 1600 x 700'),
                            ]),
                    ]),
            ]),

      
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                ->label('Banner')
                ->width(220)
                ->height(100)
                ->view("filament.banner"),

                Tables\Columns\TextColumn::make('title')
                ->label('Judul')
                ->searchable(),

                Tables\Columns\ToggleColumn::make('is_active')
                ->label('Active')
                ->default(true),

            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBanners::route('/'),
            'create' => Pages\CreateBanner::route('/create'),
            'edit' => Pages\EditBanner::route('/{record}/edit'),
        ];
    }
}
